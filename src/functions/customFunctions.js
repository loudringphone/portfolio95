import resume from '../assets/pdfs/Resume.pdf'

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

const redirectGitHub = () => {
  setTimeout(() => {
    const confirmRedirect = window.confirm("You are about to visit my GitHub page. Continue?");
    if (confirmRedirect) {
      window.open('https://github.com/loudringphone/portfolio95', '_blank');
    }
  }, 250);
}

const handleButtonTouchEnd = (event, handler) => {
  const rect = event.currentTarget.getBoundingClientRect();
  const clientX = event.changedTouches[0].clientX;
  const clientY = event.changedTouches[0].clientY;
  const withinBounds =
    clientX >= rect.left &&
    clientX <= rect.right &&
    clientY >= rect.top &&
    clientY <= rect.bottom;
  if (withinBounds) {
    handler(event);
  }
}

const downloadResume = () => {
  let a = document.createElement('a');
  a.href = resume;
  a.download = 'Resume - Winston Lau.pdf';
  a.click();
  window.open(resume, '_blank');
}

const capitalise = (str) => {
  const words = str.split(' ');
  const properNoun = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  return properNoun.join(' ');
}

const getPropertyValue = (computedStyle, property) => {
  return Number(computedStyle.getPropertyValue(property).split(' ')[0].replace('px', ''));
}

export { formatTime, redirectGitHub, handleButtonTouchEnd, downloadResume, capitalise, getPropertyValue }