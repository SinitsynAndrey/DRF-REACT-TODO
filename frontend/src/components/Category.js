import React from 'react'
import { Link } from 'react-router-dom'

const CategoryItem = ({ category }) => {
    return (
        <tr>
            <td>{category.name}</td>
        </tr>
    )
}

const CategoryList = ({ categories }) => {
    return (
        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th scope="col">Категория</th>
                </tr>
            </thead>
            <tbody>
                {categories.map((category) => <CategoryItem key={category.id.toString()} category={category} />)}
            </tbody>
        </table>
    )
}
export default CategoryList