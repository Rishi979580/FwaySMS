import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

const useSmsOrders = () => {
    const [orders, setOrders] = useState([]); // ✅ Ensure orders is always an array
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        const db = getDatabase();
        const ordersRef = ref(db, "sms_orders");

        const unsubscribe = onValue(ordersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const ordersArray = Object.entries(data).map(([id, order]) => ({
                    id,
                    ...order,
                }));
                setOrders(ordersArray);
            } else {
                setOrders([]); // ✅ If no data, set an empty array
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { orders, loading, setOrders };
};

export default useSmsOrders;
