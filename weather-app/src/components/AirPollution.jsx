function AirPollution({ pollution }) {
  const data = pollution.list[0];
  const aqiLevels = ['', 'Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
  const aqi = data.main.aqi;

  return (
    <section className="air_pollution">
      <header className="pollution_header">
        <h2 className="pollution_title">Air Quality</h2>
        <p className="pollution_aqi">
          AQI: <span className={`aqi_value aqi_${aqiLevels[aqi].toLowerCase()}`}>{aqi}</span>
          <span className="aqi_label">{aqiLevels[aqi]}</span>
        </p>
      </header>

      <dl className="pollution_components">
        <div className="component_item">
          <dt>Carbon monoxide (CO)</dt>
          <dd>{data.components.co} μg/m³</dd>
        </div>
        <div className="component_item">
          <dt>Nitrogen monoxide (NO)</dt>
          <dd>{data.components.no} μg/m³</dd>
        </div>
        <div className="component_item">
          <dt>Nitrogen dioxide (NO₂)</dt>
          <dd>{data.components.no2} μg/m³</dd>
        </div>
        <div className="component_item">
          <dt>Ozone (O₃)</dt>
          <dd>{data.components.o3} μg/m³</dd>
        </div>
        <div className="component_item">
          <dt>Sulphur dioxide (SO₂)</dt>
          <dd>{data.components.so2} μg/m³</dd>
        </div>
        <div className="component_item">
          <dt>PM2.5</dt>
          <dd>{data.components.pm2_5} μg/m³</dd>
        </div>
        <div className="component_item">
          <dt>PM10</dt>
          <dd>{data.components.pm10} μg/m³</dd>
        </div>
        <div className="component_item">
          <dt>Ammonia (NH₃)</dt>
          <dd>{data.components.nh3} μg/m³</dd>
        </div>
      </dl>
    </section>
  );
}

export default AirPollution;