import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import u from "../utils/ReviewList";
import "../designs/ReviewList.css";

export default function ReviewList() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(1);

    useEffect(() => {
        setPage(() => {
            if (Number(searchParams.get("p")) !== 0)
                return Number(searchParams.get("p"));
            else return 1;
        });
    }, [searchParams.get("p")]);

    useEffect(() => {
        setLoading(true);
        u.getReviews({
            p: page,
        })
            .then((reviews) => setReviews(reviews))
            .then(() => setLoading(false));
    }, [page]);

    if (loading) return <p>Loading reviews...</p>;
    return (
        <>
            <ul id="reviewlist">
                {reviews.map(({ title, owner, review_img_url, review_id }) => {
                    return (
                        <li key={review_id}>
                            <p className="reviewlist-title">{title}</p>
                            <p className="reviewlist-owner">by {owner}</p>
                            <img src={review_img_url} />
                        </li>
                    );
                })}
            </ul>
            <section>
                <Link
                    className={page > 1 ? "" : "hidden"}
                    to={`/reviews?p=${page - 1}`}
                >
                    previous
                </Link>
                <Link to={`/reviews?p=${page + 1}`}>next</Link>
            </section>
        </>
    );
}
