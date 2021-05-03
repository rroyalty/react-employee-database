import React from 'react';

const Table = (props) => {
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th scope='col'>Picture</th>
                    <th scope='col' data-field="name" data-sortable='true'>
                        <span onClick={() => props.onSort('name')}>Name</span>
                    </th>
                    <th scope="col" data-sortable='true'>
                        <span onClick={() => props.onSort('phone')}>Phone</span>
                    </th>
                    <th scope="col" data-sortable='true'>
                        <span onClick={() => props.onSort('email')}>Email</span>
                    </th>
                    <th scope="col" data-sortable='true'>
                        <span onClick={() => props.onSort('city')}>City</span>
                    </th>
                    <th scope="col" data-sortable='true'>
                        <span onClick={() => props.onSort('state')}>State</span>
                    </th>
                    <th scope="col" data-sortable='true'>
                        <span onClick={() => props.onSort('street')}>Street</span>
                    </th>
                    <th scope="col" data-sortable='true'>
                        <span onClick={() => props.onSort('postcode')}>Postcode</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    props.state.filteredEmployees.map((employee) => {
                        const { first, last } = employee.name;
                        const { street, city, state, postcode } = employee.location;
                        const fullName = ` ${last}, ${first}`;
                        const key = employee.id.value

                        return (
                            <>
                            <tr key={key}>
                                <td>
                                    <img className='img' src={employee.picture.thumbnail} alt={fullName} />
                                </td>
                                <td className='row-data'>{fullName}</td>
                                <td className='row-data'>
                                    <a href={`tel:${employee.phone}`}>{employee.phone}</a></td>
                                <td className='row-data email'>
                                    <a href={`mailto:${employee.email}`}>{employee.email}</a>
                                </td>
                                <td className='row-data'>{city}</td>
                                <td className='row-data'>{state}</td>
                                <td className='row-data'>{`${street.number} ${street.name}`}</td>
                                <td className='row-data'>{postcode}</td>
                            </tr>
                            </>
                        );
                    })
                }
            </tbody>
        </table>
    )
}

export default Table;