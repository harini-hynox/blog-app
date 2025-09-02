import {useState} from 'react'
import './counter.css';
import plus from './assests/plus.svg';
import minus from './assests/minus.svg';
import reset from './assests/refresh.svg';
const Counter = () => {
  const [Count, setCount] = useState(0);
  return (
    <div className='whole-body-counter'>
        <div className='counter-card'>
            <div className='counter-value'>
                <h3 className='count'>{Count}</h3>
            </div>
            <div className='counter-buttons'>
                <button onClick={() => setCount(Count + 1)} className='c-button'><img src={plus} alt="increment" className='button-image'/></button>
                <button onClick={() => setCount(Count - 1)} className='c-button'><img src={minus} alt="decrement" className='button-image'/></button>
                <button onClick={() => setCount(0)} className='c-button'><img src={reset} alt="reset" className='button-image'/></button>
            </div>
        </div>

    </div>
  )
}

export default Counter