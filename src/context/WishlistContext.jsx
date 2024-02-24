import React, { createContext, useState, useEffect} from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    // Initialize the wishlist from local storage or set it to an empty array if not present
    const [wishlist, setWishlist] = useState(() => {
        const localData = localStorage.getItem('wishlist');
        return localData ? JSON.parse(localData) : [];
    });

    // Function to add an item to the wishlist
    const addToWishlist = (item) => {
        setWishlist((prevWishlist) => {
            if (!prevWishlist.some(wishlistItem => wishlistItem.name === item.name)) {
                return [...prevWishlist, item];
            }
            return prevWishlist;
        });
    };
    const removeFromWishlist = (itemName) => {
        setWishlist((prevWishlist) => prevWishlist.filter(item => item.name !== itemName));
    };

    // Effect hook to update local storage when the wishlist state changes
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist,removeFromWishlist}}>
            {children}
        </WishlistContext.Provider>
    );
};
