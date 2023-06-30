(async () => {
  try {
    await require("./setting")();
  } catch (err) {
    console.log(err);
  }
})();
