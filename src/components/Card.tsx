import css from "../css/Card.module.css";

interface CardProps {
    cardName: string,
    imgUrl: string,
    index: number,
    onCardClick: (index: number) => void
}

const Card = ( { cardName, imgUrl, index, onCardClick }: CardProps) => {
    return (
        <div className={css.card} onClick={() => onCardClick(index)}>
            <img className={css.img} src={imgUrl} alt={cardName} />
            <div className={css.cardFooter}>
                <h4><b>{cardName}</b></h4>
            </div>
        </div>
    )
}

export default Card;
