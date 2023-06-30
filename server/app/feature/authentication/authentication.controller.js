const logger = require("app/lib/logger");
const { verifyPassword } = require("app/lib/crypto");
const config = require("app/config");
const UserToken = require("app/model").user_tokens;
const GrantType = require("app/model/value-object/token-grant-type");
const { v4: uuidv4 } = require("uuid");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const jwt = require("jsonwebtoken");
const joi = require("joi");
const { refreshToken, login } = require("./validator");
const User = require("app/model").users;

module.exports = {
  token: async (req, res, next) => {
    try {
      const { grant_type } = req.body;
      if (grant_type == GrantType.REFRESH_TOKEN) {
        const result = joi.validate(req.body, refreshToken);
        if (result.error) {
          const err = {
            details: result.error.details,
          };
          return res.badRequest(
            res.__("MISSING_PARAMETERS"),
            "MISSING_PARAMETERS",
            err
          );
        }
        return await _loginWithToken(req, res, next);
      } else if (grant_type == GrantType.PASSWORD) {
        const result = joi.validate(req.body, login);
        if (result.error) {
          const err = {
            details: result.error.details,
          };

          return res.badRequest(
            res.__("MISSING_PARAMETERS"),
            "MISSING_PARAMETERS",
            err
          );
        }
        return await _loginWithPassword(req, res, next);
      }

      return res.badRequest(
        res.__("UNSUPPORT_GRANT_TYPE"),
        "UNSUPPORT_GRANT_TYPE"
      );
    } catch (err) {
      logger.error("BACKEND::TOKEN::", err);
      next(err);
    }
  },
};

async function _loginWithToken(req, res, next) {
  let token = await UserToken.findOne({
    where: {
      refresh_token: req.body.refresh_token,
      revoked: false,
    },
  });

  if (!token) {
    return res.notFound(res.__("TOKEN_NOTFOUND"), "TOKEN_NOTFOUND");
  }
  if (token.refresh_token_expired_date <= new Date()) {
    return res.forbidden(res.__("TOKEN_IS_EXPIRED"), "TOKEN_IS_EXPIRED");
  }

  let payload = {
    email: token.email,
    id: token.user_id,
  };

  const tokenInfo = await _generateAccessToken({
    user: payload,
    grant_type: req.body.grant_type,
  });

  await UserToken.update(
    {
      revoked: true,
    },
    {
      where: {
        refresh_token: req.body.refresh_token,
      },
    }
  );

  return res.ok(tokenInfo);
}

async function _loginWithPassword(req, res, next) {
  const {
    body: { grant_type, email, password },
  } = req;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
    },
  });

  if (!user) return res.badRequest(res.__("USER_NOT_FOUND"), "USER_NOT_FOUND");

  const checkPassword = verifyPassword(password, user.password, user.salt);

  if (!checkPassword)
    return res.badRequest(
      res.__("EMAIL_OR_PASSWORD_IS_WRONG"),
      "EMAIL_OR_PASSWORD_IS_WRONG"
    );

  let payload = {
    email: email,
    id: user.id,
  };
  const tokenInfo = await _generateAccessToken({
    user: payload,
    grant_type: grant_type,
  });

  return res.ok(tokenInfo);
}

async function _generateAccessToken({ user, grant_type }) {
  const payload = {
    iat: Math.ceil(Date.now() / 1000),
    email: user.email,
    id: user.id,
    grant_type: grant_type,
  };

  const refreshTokenLifetime = config.token.refreshTokenExpiresIn;
  const accessToken = jwt.sign(
    payload,
    config.token.key.private,
    config.token.signOption
  );
  const refreshToken = Buffer.from(uuidv4()).toString("base64");
  await _generateToken({
    id: user.id,
    grant_type: grant_type,
    refresh_token_expires_in: refreshTokenLifetime,
    refresh_token: refreshToken,
    access_token: accessToken,
  });

  const tokenData = {
    token_type: "Bearer",
    access_token: accessToken,
    expires_in: config.token.signOption.expiresIn,
    refresh_token: refreshToken,
    user,
  };

  return tokenData;
}

async function _generateToken({
  id,
  grant_type,
  refresh_token_expires_in,
  refresh_token,
  access_token,
}) {
  let expiredDate = new Date();
  expiredDate.setSeconds(expiredDate.getSeconds() + refresh_token_expires_in);
  const data = {
    user_id: id,
    refresh_token_expired_date: expiredDate,
    grant_type: grant_type,
    refresh_token: refresh_token,
    revoked: false,
    // access_token,
  };
  const result = await UserToken.create(data);
  return result;
}
