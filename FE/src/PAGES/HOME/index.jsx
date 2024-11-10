import React from 'react';
import TransactionsTable from '../../COMPONENTS/Tables/TRANSACTION_TABLE';

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
