function Footer() {
  return (
    <footer className="footer">
      <p>Data owner <a href="https://openweathermap.org">OpenWeather</a></p>
      <p>
        Update: <time dateTime={new Date().toISOString()}>
          {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </time>
      </p>
    </footer>
  );
}

export default Footer;