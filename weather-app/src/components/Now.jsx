import { getIconUrl } from '../services/api';

function Now({ weather }) {
  const current = weather.list[0];
  const icon = current.weather[0].icon;
  const description = current.weather[0].description;

  return (
    <section className="now">
      <header className="now_header">
        <time className="now_date" dateTime={new Date().toISOString()}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric' })}
        </time>
        <h1 className="now_city">{weather.city.name}</h1>
      </header>

      <article className="now_main">
        <p className="now_temp">{Math.round(current.main.temp)}°</p>
        <figure className="now_icon">
          <img src={getIconUrl(icon)} alt={description} />
          <figcaption>{description}</figcaption>
        </figure>
      </article>

      <dl className="now_details">
        <dt className="now_time">
          Now: <time dateTime={current.dt_txt}>{current.dt_txt.slice(11, 16)}</time>
        </dt>
        <div className="detail-item">
          <dt>Wind:</dt>
          <dd>{current.wind.speed} m/s</dd>
        </div>
        <div className="detail-item">
          <dt>Humidity:</dt>
          <dd>{current.main.humidity}%</dd>
        </div>
        <div className="detail-item">
          <dt>Air Pressure:</dt>
          <dd>{current.main.pressure} mm</dd>
        </div>
      </dl>
    </section>
  );
}

export default Now;