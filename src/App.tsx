import {useState} from 'react';
import './App.scss'

interface CardInfo {
    cardNumber: string;
    expirationMonth: string
    expirationYear: string
    cvv: string;
}

const App = () => {
    const [cardInfo, setCardInfo] = useState<CardInfo>({
        cardNumber: '',
        expirationMonth: '',
        expirationYear: '',
        cvv: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        const result = value.replace(/[^0-9/]/gi, '');
        if (name === "cardNumber") {
            const formattedValue = result.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ') ?? '';
            setCardInfo((prevCardInfo) => ({...prevCardInfo, [name]: formattedValue}));
        } else {
            setCardInfo((prevCardInfo) => ({...prevCardInfo, [name]: result}));
        }
        if (name === "cardNumber" && result.length >= 16) {
            document.getElementById("expirationMonth")?.focus();
        }
        if (name === "expirationMonth" && result.length >= 2) {
            document.getElementById("expirationYear")?.focus();
        }
        if (name === "expirationYear" && result.length >= 2) {
            document.getElementById("cvv")?.focus();
        }
    };
    const info = cardInfo.cardNumber + cardInfo.expirationMonth + cardInfo.expirationYear + cardInfo.cvv;

    return (
        <div className='App'>
            <div className={info.length === 26 ? 'Card2' : 'Card'}>

                <p>Card Number:</p>
                <div className='row'>

                    <div className='number'>

                        <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            placeholder={'•••••••••••••••••••'}
                            value={cardInfo.cardNumber}
                            onChange={handleInputChange}
                            pattern="\d*"
                            inputMode="numeric"
                            maxLength={19}
                            required
                        />
                    </div>
                    <div className='image'>
                        <img width={50} src={
                            cardInfo.cardNumber.slice(0, 1) === '2' ? 'img.png' :
                                cardInfo.cardNumber.slice(0, 1) === '3' ? 'img3.png' :
                                    cardInfo.cardNumber.slice(0, 1) === '4' ? 'img2.png' :
                                        cardInfo.cardNumber.slice(0, 1) === '5' ? 'img.png' :
                                            ''
                        }/>

                    </div>
                </div>
                <div className='row2'>
                    <div>
                        <p>Date:</p>
                        <div className='expiration'>

                            <input
                                placeholder={'XX'}
                                type="text"
                                id="expirationMonth"
                                name="expirationMonth"
                                value={cardInfo.expirationMonth}
                                onChange={handleInputChange}
                                pattern="\d{2}/\d{2}"
                                inputMode="numeric"
                                maxLength={2}
                                required
                            />
                            <p>/</p>
                            <input
                                placeholder={'YY'}
                                type="text"
                                id="expirationYear"
                                name="expirationYear"
                                value={cardInfo.expirationYear}
                                onChange={handleInputChange}
                                pattern="\d{2}/\d{2}"
                                inputMode="numeric"
                                maxLength={2}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <p>CVV:</p>
                        <div className='cvv'>

                            <input
                                placeholder={'•••'}
                                type="text"
                                id="cvv"
                                name="cvv"
                                value={cardInfo.cvv}
                                onChange={handleInputChange}
                                pattern="\d*"
                                inputMode="numeric"
                                maxLength={3}
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {info.length === 26 ? <button onClick={
                    () => {
                        console.log(cardInfo);
                    }
                }>Submit (console)
                </button> : null}
            </div>
        </div>
    );
};

export default App;