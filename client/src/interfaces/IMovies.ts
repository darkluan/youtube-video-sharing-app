export interface IMovie {
  [x: string]: any
  id: string
  idVideo: string
  src?: string
  title?: string
  description?: string
  sharedBy?: string
}

export const moviesData: IMovie[] = [
  {
    id: '1',
    idVideo: '52Zs3Jo7cy0',
    src: 'https://www.youtube.com/embed/52Zs3Jo7cy0',
    title: 'title 1',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    sharedBy: 'sharedBy1@gmail.com'
  },
  {
    id: '2',
    idVideo: '52Zs3Jo7cy0',
    src: 'https://www.youtube.com/embed/52Zs3Jo7cy0',
    title: 'title 1',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    sharedBy: 'sharedBy1@gmail.com'
  }
]
