import * as React from 'react';
import {Offer} from '../../api/offersAPI.types';
import {IconButton, Stat, StatGroup, StatHelpText, StatLabel, StatNumber, useDisclosure} from '@chakra-ui/react';
import {Trash} from 'react-feather';
import {AreYouSureAlert} from '../../../common/components/AreYouSureAlert';
import {Card} from '../../../common/components/Card';
import {calculateProfit} from './OfferInfo.helpers';

/**
 * Parameter definition
 */
interface Props {
    /**
     * Offer info to be displayed
     */
    offer: Offer;
    /**
     * Function that deletes offer on Delete button click
     * @param offer object to be deleted
     */
    onDelete: (offer: Offer) => void;
}

/**
 * Shows basic info about offer generated by lender
 * @param offer
 * @param onDelete
 * @constructor
 */
export const OfferInfo: React.FC<Props> = ({offer, onDelete}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    const handleConsent = () => {
        onDelete(offer);
        onClose();
    };

    return (
        <Card maxWidth={'500px'} width={'full'}>
            <StatGroup>
                <Stat>
                    <StatLabel>Amount</StatLabel>
                    <StatNumber>${offer.auction.loanAmount.toFixed(2)}</StatNumber>
                    <StatHelpText>Expected profit: ${calculateProfit(offer.auction, offer.annualPercentageRate)}</StatHelpText>
                </Stat>

                <Stat>
                    <StatLabel>Interest</StatLabel>
                    <StatNumber>{(offer.annualPercentageRate * 100).toFixed(2)}%</StatNumber>
                </Stat>

                <IconButton name="DeleteOffer" colorScheme={'red'} aria-label={'Delete offer'} icon={<Trash />} onClick={onOpen} />
            </StatGroup>
            <AreYouSureAlert
                isOpen={isOpen}
                onClose={onClose}
                onConsent={handleConsent}
                dialogText={'Are you sure?'}
                title={'Delete offer'}
            />
        </Card>
    );
};
