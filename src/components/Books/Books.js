import React from "react";
import { db } from "../../firebase";

const Books = () => {
    
    async function getBooks() {
        const snapshot = await db.collection('books').get()
        const collection = [];
        snapshot.forEach(doc => {
            collection[doc.id] = doc.data();
        });
        console.log(collection)
        return collection;
    }
    getBooks()
    return (
        <>
        <h1>hello</h1>
        </>
    )
}
export default Books