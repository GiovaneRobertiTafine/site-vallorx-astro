import '../styles/time.scss';
import { useEffect } from 'react';
import { DateTimeFormat } from '../utils/date-time-format.interface';
import { TimeZone } from '../utils/time-zone.enum';

const Time = ({ viewTime, changeViewTime }) => {
    const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: false } as DateTimeFormat;

    const setTimeZone = (zone: TimeZone) => {
        return Intl.DateTimeFormat('pt-BR', { ...optionsTime, timeZone: zone }).format();
    };

    useEffect(() => {
        const interval = setInterval(() => {
            document.getElementById('new-york').innerHTML = setTimeZone(TimeZone.NY);
            document.getElementById('pequim').innerHTML = setTimeZone(TimeZone.HK);
            document.getElementById('londres').innerHTML = setTimeZone(TimeZone.UK);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const changeViewTimeMobile = viewTime ? 'box-time open' : 'box-time close';

    return (
        <div className={changeViewTimeMobile}>
            <div className="card img-clock" onClick={() => changeViewTime()}>
                <img src="/assets/time/clock.svg" alt="time" />
            </div>

            <div className="card schedule">
                <div className="card-header">
                    Horário
                    <img id="close" src="/assets/time/x.svg" alt="svg" onClick={() => changeViewTime()} />
                </div>
                <div className="card-body">
                    <small>Nova Iorque</small><br />
                    <span class="country country-us"></span>
                    <small id="new-york">00:00</small>
                    <br /><br />
                    <small>Pequim</small><br />
                    <span class="country country-cn"></span>
                    <small id="pequim">00:00</small>
                    <br /><br />
                    <small>Londres</small><br />
                    <span class="country country-gb"></span>
                    <small id="londres">00:00</small>
                    <br />
                </div>
            </div>
        </div>

    );
};

export default Time;

