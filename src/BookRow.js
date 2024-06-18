import React from "react";

const BookRow = (props) => {
    const { item } = props;

    return (
            <tr>
                <td>{item.id}</td>
                <td>{item.userId}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.publisher}</td>
            </tr>
    )
}

export default BookRow;