import { 
    useContext,
 } from 'react'

import { FriendContext } from '../Context/FriendsContext';

export const useFriendContext = () => {

    const context = useContext(FriendContext)

    if (context === undefined) {
        throw new Error('useAccountContext must be used within an AccountProvider');
    }
    return context;
}