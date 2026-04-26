import { getIconUrl } from '../services/api';

function Forecast({ weather }) {
  const daily = weather.list.filter((item) =>
    item.dt_txt.includes('12:00:00')
  );

  return (
    <section className="forecast">
      <header className="forecast_header">
        <h2 className="forecast_title">Forecast</h2>
      </header>

      <ul className="forecast_list">
        {daily.map((day) => (
          <li key={day.dt} className="forecast_item">
            <article className="forecast_day">
              <time className="forecast_date" dateTime={day.dt_txt}>
                {new Date(day.dt_txt).toLocaleDateString('en-US', {
                  weekday: 'long',
                  day: 'numeric',
                })}
              </time>
              <figure className="forecast_icon">
                <img
                  src={getIconUrl(day.weather[0].icon)}
                  alt={day.weather[0].description}
                />
                <figcaption>{day.weather[0].description}</figcaption>
              </figure>
              <p className="forecast_temp">{Math.round(day.main.temp)}°</p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Forecast;