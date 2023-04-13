import { DeleteTwoTone } from '@ant-design/icons';
import { Modal } from 'antd';
import { useState } from 'react';
import { doc, deleteDoc } from "firebase/firestore";

const Order = ({ additives, adress, id, isDone, meet, nameCompany, needFacture, pits, price, db, getData, setIsLoading }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [checkValue, setCheckValue] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const deleteOrder = async () => {
        setIsLoading(true);
        await deleteDoc(doc(db, "orders", id));
        getData();
        setIsLoading(false);
    }

    const pitsEl = pits.map(el => {
        return (
            <span className='px-2'>{el.name} <span className='text-red-700'>{el.count} шт</span></span>
        )
    });

    const additivesEl = additives.map(el => {
        return (
            <span className='px-2'>{el.name} <span className='text-red-700'>{el.count} шт</span></span>
        )
    })

    return (
        <div className="flex flex-col md:flex-row justify-between w-full p-3 mt-2 bg-white drop-shadow-xl border rounded-md border-r-slate-100">
            <div className="flex flex-col justify-center w-full  md:w-6/12">
                <div className="flex">
                    <h5 className="px-3 font-bold text-lg">Комания:</h5>
                    <span>{nameCompany}</span>
                </div>
                <div className="flex">
                    <h5 className="px-3 font-bold text-lg">Адрес:</h5>
                    <span>{adress}</span>
                </div>
            </div>
            <div className="w-full md:w-6/12 mt-2 md:mt-0 flex justify-between md:justify-end">
                <div className="flex items-center">
                    <button className="px-3 md:px-10 py-2 md:py-5 text-sky-500 hover:text-sky-900" onClick={showModal}>Подробней</button>
                </div>
                <div className="hidden md:flex items-center px-5" onClick={deleteOrder}>
                    <DeleteTwoTone style={{ fontSize: '36px' }} twoToneColor="#eb2f96" />
                </div>
                <div className="flex md:hidden items-center px-5" onClick={deleteOrder}>
                    <DeleteTwoTone  style={{ fontSize: '26px' }} twoToneColor="#eb2f96" />
                </div>
            </div>
            <Modal
                title="Заказ"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={[
                    <button className='px-2 py-2 border rounded-md border-cyan-400 bg-cyan-400 text-white border-solid' onClick={handleCancel}>
                        Закрыть
                    </button>,
                ]}
            >
                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Название компание:</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{nameCompany}</dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Адрес:</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{adress}</dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Нужна фактура?</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{needFacture ? 'Да' : 'Нет'}</dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Мясо:</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{meet}</dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Питы:</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    {pitsEl}
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Добавки:</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    {additivesEl}
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Сумма заказа:</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{price}$</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Order;