import React from 'react';
import TransactionsTable from '../../COMPONENTS/TABLES/TRANSACTION_TABLE';

const Home = () => {
    return (
        <div>
            <div className="container mt-5">
                <TransactionsTable />
            </div>
        </div>
    );
};

export default Home;
