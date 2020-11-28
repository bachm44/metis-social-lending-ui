import * as React from 'react';
import {Loan} from '../../api/loansAPI.types';
import {BrowseLoansItem} from './BrowseLoansItem';
import {Stack} from '@chakra-ui/react';
import {EmptyPage} from '../../../common/components/EmptyPage';
import {sortLoans} from './BrowseLoans.helpers';

/**
 * Parameter definitions for {@link BrowseLoans}
 */
interface Props {
    /**
     * Loans which will be displayed using {@link BrowseLoansItem}
     * components
     */
    loans: Loan[];
    payInstallment: (loanId: number, amount: number) => Promise<boolean>;
    isPaymentFetching: boolean;
}

/**
 * List of loan items. This component, with
 * loans prop will be rendered inside {@link BorrowerLoanView}
 * @param loans
 * @constructor
 */
export const BrowseLoans: React.FC<Props> = ({loans, payInstallment, isPaymentFetching}) => {
    const sortedLoans = sortLoans(loans);
    return (
        <Stack m={3} align={'center'}>
            {sortedLoans.length !== 0 ? (
                sortedLoans.map(loan => (
                    <BrowseLoansItem key={loan.id} loan={loan} payInstallment={payInstallment} isPaymentFetching={isPaymentFetching} />
                ))
            ) : (
                <EmptyPage text={"Looks like there aren't any loans here yet :("} />
            )}
        </Stack>
    );
};
