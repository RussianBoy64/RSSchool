export default async function createVideoBg() {
  const videoWrapper = document.createElement('div')
  const video = document.createElement('video')
  const source = document.createElement('source')

  video.loop = true
  video.autoplay = true
  video.muted = true

  source.src = './assets/birdBackground.mp4'
  source.type = 'video/mp4'

  videoWrapper.classList.add('video__wrapper')
  video.classList.add('video__background')

  video.append(source)
  videoWrapper.append(video)

  return videoWrapper
}
