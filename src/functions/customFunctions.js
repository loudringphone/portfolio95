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

export { formatTime, redirectGitHub }