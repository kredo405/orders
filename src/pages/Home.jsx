import { Modal, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Form from '../components/Form';
import Order from '../components/Order';
import { getFirestore, collection, getDocs } from "firebase/firestore";

const Home = ({ app }) => {
    const [orders, setOrders] = useState([{
        id: '',
        nameCompany: '',
        adress: '',
        needFacture: false,
        pits: [{ name: '', count: '' }],
        meet: '',
        additives: [{ name: '', count: '' }],
        price: '122',
        isDone: false
    }])
    const [isLoading, setIsLoading] = useState(false)
    const state = useSelector(state => state);
    const db = getFirestore(app);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const getData = async () => {
        setIsLoading(true);
        const arr = [];
        const querySnapshot = await getDocs(collection(db, 'orders'));
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            arr.push(doc.data());
        });

        setOrders(arr);
        setIsLoading(false);
    }

    const ordersElements = orders.map(el => {
        return (
            <Order
                additives={el.additives}
                adress={el.adress}
                id={el.id}
                isDone={el.isDone}
                meet={el.meet}
                nameCompany={el.nameCompany}
                needFacture={el.needFacture}
                pits={el.pits}
                price={el.price}
                db={db}
                getData={getData}
                setIsLoading = {setIsLoading}
            />
        )
    });

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <div className="flex border-b border-gray-900/10 h-[60px] justify-end mr-10 items-center">
                <div>
                    <button
                        className='inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        onClick={showModal}>
                        Добавить заказ
                    </button>
                    <Modal
                        open={isModalOpen}
                        onCancel={handleCancel}
                        footer={[
                            <div className='border-t'></div>
                        ]}
                    >
                        <Form handleOk={handleOk} db={db} getData={getData} setIsLoading={setIsLoading}/>
                    </Modal>
                </div>
            </div>
            <div className='px-2 md:px-20 py-2 md:py-10'>
                {isLoading ?
                    <div className='w-full h-[60vh] flex justify-center items-center'>
                        <Spin size="large" />
                    </div>
                    :
                    ordersElements 
                }

            </div>
        </div>
    )
}

export default Home;