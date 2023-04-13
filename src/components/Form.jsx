import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { setOrders } from '../store/slices/ordersSlice';
import nextId from "react-id-generator";
import { collection, doc, setDoc } from "firebase/firestore";

const Form = ({ handleOk, db, getData, setIsLoading }) => {
    const [countAdditives, setCountAdditives] = useState([{ name: '', count: 0 }]);
    const [countPits, setCountPits] = useState([{ name: '', count: 0 }]);
    const [companyName, setCompanyName] = useState('');
    const [adress, setAdress] = useState('');
    const [meet, setMeet] = useState('');
    const [texture, setTexture] = useState(false);
    const dispatch = useDispatch();
    const id = nextId();

    const onChangeAdditives = (e) => {
        const arrFilter = countAdditives.filter(el => el.name !== e.target.name);
        arrFilter.push({ name: e.target.name, count: e.target.value })
        setCountAdditives(arrFilter);
    };

    const onChangePits = (e) => {
        const arrFilter = countPits.filter(el => el.name !== e.target.name);
        arrFilter.push({ name: e.target.name, count: e.target.value })
        setCountPits(arrFilter);
    };

    const onChangeCompanyName = (e) => {
        setCompanyName(e.target.value);
    };

    const onChangeAdress = (e) => {
        setAdress(e.target.value);
    };

    const onChangeTexture = (e) => {
        setTexture(e.target.value);
    };

    const onChangeMeet = (e) => {
        setMeet(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const newArrayAdditives = countAdditives.filter(el => el.name !== '');
        const newArrayPits = countPits.filter(el => el.name !== '');

        setIsLoading(true);

        const citiesRef = collection(db, "orders");

        await setDoc(doc(citiesRef, id), {
            id: id, nameCompany: companyName, 
            adress: adress, needFacture: texture,
            pits: newArrayPits, meet: meet,
            additives: newArrayAdditives, price: 122, isDone: false
        });

        getData();

        setIsLoading(false);

        dispatch(setOrders({
            id: id,
            nameCompany: companyName,
            adress: adress,
            needFactire: texture,
            pits: newArrayPits,
            meet: meet,
            additives: newArrayAdditives,
            price: '122',
            isDone: false
        }));
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-2xl text-center font-semibold leading-7 py-5 text-gray-900">Добавление заказа</h2>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="companyName" className="block text-sm font-medium leading-6 text-gray-900">
                                Название фирмы
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="companyName"
                                    id="companyName"
                                    autoComplete="given-name"
                                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={onChangeCompanyName}
                                    value={companyName}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="adress" className="block text-sm font-medium leading-6 text-gray-900">
                                Адрес доставки
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="adress"
                                    id="adress"
                                    autoComplete="family-name"
                                    className="block w-full  px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={onChangeAdress}
                                    value={adress}
                                />
                            </div>
                        </div>

                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Нужна фактура?</legend>
                            <div className="mt-6 space-y-6">
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="yes"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        onChange={onChangeTexture}
                                        value={true}
                                    />
                                    <label htmlFor="yes" className="block text-sm font-medium leading-6 text-gray-900">
                                        Да
                                    </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="no"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        onChange={onChangeTexture}
                                        value={false}
                                    />
                                    <label htmlFor="no" className="block text-sm font-medium leading-6 text-gray-900">
                                        Нет
                                    </label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div className="sm:col-span-3 border-b border-gray-900/10 pb-12">
                    <div className='flex flex-col justify-center'>
                        <span className='py-5 font-bold text-lg'>Питы:</span>
                        <div>
                            <div className='flex items-center py-1'>
                                <label className='w-5/12 md:w-2/12' htmlFor="18 см">18 см</label>
                                <input
                                    className='border mx-10 px-2 w-7/12 md:w-2/12 py-1 m-auto'
                                    id='18 см'
                                    name='18 см'
                                    type="number"
                                    placeholder='0'
                                    onChange={onChangePits}
                                />
                            </div>
                            <div className='flex items-center py-1'>
                                <label className='w-5/12 md:w-2/12' htmlFor="20 см">20 см</label>
                                <input
                                    className='border mx-10 px-2 w-7/12 md:w-2/12 py-1 m-auto'
                                    id='20 см'
                                    name='20 см'
                                    type="number"
                                    placeholder='0'
                                    onChange={onChangePits}
                                />
                            </div>
                            <div className='flex items-center py-1'>
                                <label className='w-5/12 md:w-2/12' htmlFor="22 см">22 см</label>
                                <input
                                    className='border mx-10 px-2 w-7/12 md:w-2/12 py-1 m-auto'
                                    id='22 см'
                                    name='22 см'
                                    type="number"
                                    placeholder='0'
                                    onChange={onChangePits}
                                />
                            </div>
                            <div className='flex items-center py-1'>
                                <label className='w-5/12 md:w-2/12' htmlFor="25 см">25 см</label>
                                <input
                                    className='border mx-10 px-2 w-7/12 md:w-2/12 py-1 m-auto'
                                    id='25 см'
                                    name='25 см'
                                    type="number"
                                    placeholder='0'
                                    onChange={onChangePits}
                                />
                            </div>
                            <div className='flex items-center py-1'>
                                <label className='w-5/12 md:w-2/12' htmlFor="26 см">26 см</label>
                                <input
                                    className='border mx-10 px-2 w-7/12 md:w-2/12 py-1 m-auto'
                                    id='26 см'
                                    name='26 см'
                                    type="number"
                                    placeholder='0'
                                    onChange={onChangePits}
                                />
                            </div>
                            <div className='flex items-center py-1'>
                                <label className='w-5/12 md:w-2/12' htmlFor="30 см">30 см</label>
                                <input
                                    className='border mx-10 px-2 w-7/12 md:w-2/12 py-1 m-auto'
                                    id='30 см'
                                    name='30 см'
                                    type="number"
                                    placeholder='0'
                                    onChange={onChangePits}
                                />
                            </div>
                            <div className='flex items-center py-1'>
                                <label className='w-5/12 md:w-2/12' htmlFor="Хлеб">Хлеб</label>
                                <input
                                    className='border mx-10 px-2 w-7/12 md:w-2/12 py-1 m-auto'
                                    id='Хлеб'
                                    name='Хлеб'
                                    type="number"
                                    placeholder='0'
                                    onChange={onChangePits}
                                />
                            </div>
                            <div className='flex items-center py-1'>
                                <label className='w-5/12 md:w-2/12' htmlFor="Грубы">Грубы</label>
                                <input
                                    className='border mx-10 px-2 w-7/12 md:w-2/12 py-1 m-auto'
                                    id='Грубы'
                                    name='Грубы'
                                    type="number"
                                    placeholder='0'
                                    onChange={onChangePits}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <fieldset>
                    <legend className="text-lg font-bold leading-6 text-gray-900">Мясо</legend>
                    <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                            <input
                                id="baranina"
                                name="push-notifications"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                onChange={onChangeMeet}
                                value='Баранина'
                            />
                            <label htmlFor="baranina" className="block text-sm font-medium leading-6 text-gray-900">
                                Баранина
                            </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                            <input
                                id="kurica"
                                name="push-notifications"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                onChange={onChangeMeet}
                                value='Курица'
                            />
                            <label htmlFor="kurica" className="block text-sm font-medium leading-6 text-gray-900">
                                Курица
                            </label>
                        </div>
                    </div>
                </fieldset>
                <div className='flex flex-col justify-center border-b border-gray-900/10 pb-12'>
                    <span className='py-5 font-bold text-lg'>Добавки:</span>
                    <div>
                        <div className='flex items-center py-1'>
                            <label className='w-5/12 md:w-2/12' htmlFor="Фалафель">Фалафель</label>
                            <input
                                className='border mx-10 px-2 w-7/12 md:w-2/12 py-1 m-auto'
                                id='Фалафель'
                                name='Фалафель'
                                type="number"
                                placeholder='0'
                                onChange={onChangeAdditives}
                            />
                        </div>
                        <div className='flex items-center py-1'>
                            <label className='w-5/12 md:w-2/12' htmlFor="Баклава">Баклава</label>
                            <input
                                className='border mx-10 px-2 w-7/12 md:w-2/12 py-1 m-auto'
                                id='Баклава'
                                name='Баклава'
                                type="number"
                                placeholder='0'
                                onChange={onChangeAdditives}
                            />
                        </div>
                        <div className='flex items-center py-1'>
                            <label className='w-5/12 md:w-2/12' htmlFor="Фолия">Фолия</label>
                            <input
                                className='border mx-10 px-2 w-7/12 md:w-2/12 py-1 m-auto'
                                id='Фолия'
                                name='Фолия'
                                type="number"
                                placeholder='0'
                                onChange={onChangeAdditives}
                            />
                        </div>
                        <div className='flex items-center py-1'>
                            <label className='w-5/12 md:w-2/12' htmlFor="Каптурки">Каптурки</label>
                            <input
                                className='border mx-10 px-2 w-7/12 md:w-2/12 py-1 m-auto'
                                id='Каптурки'
                                name='Каптурки'
                                type="number"
                                placeholder='0'
                                onChange={onChangeAdditives}
                            />
                        </div>
                        <div className='flex items-center py-1'>
                            <label className='w-5/12 md:w-2/12' htmlFor="Майонез">Майонез</label>
                            <input
                                className='border mx-10 px-2 w-7/12 md:w-2/12 py-1 m-auto'
                                id='Майонез'
                                name='Майонез'
                                type="number"
                                placeholder='0'
                                onChange={onChangeAdditives}
                            />
                        </div>
                        <div className='flex items-center py-1'>
                            <label className='w-5/12 md:w-2/12' htmlFor="Соус">Соус</label>
                            <input
                                className='border mx-10 px-2 w-7/12 md:w-2/12 py-1 m-auto'
                                id='Соус'
                                name='Соус'
                                type="number"
                                placeholder='0'
                                onChange={onChangeAdditives}
                            />
                        </div>
                        <div className='flex items-center py-1'>
                            <label className='w-5/12 md:w-2/12' htmlFor="артон каптурек">Картон каптурек</label>
                            <input
                                className='border mx-10 px-2 w-7/12 md:w-2/12 py-1 m-auto'
                                id='Картон каптурек'
                                name='Картон каптурек'
                                type="number"
                                placeholder='0'
                                onChange={onChangeAdditives}
                            />
                        </div>
                        <div className='flex items-center py-1'>
                            <label className='w-5/12 md:w-2/12' htmlFor="Картон фолии">Картон фолии</label>
                            <input
                                className='border mx-10 px-2 w-7/12 md:w-2/12 py-1 m-auto'
                                id='Картон фолии'
                                name='Картон фолии'
                                type="number"
                                placeholder='0'
                                onChange={onChangeAdditives}
                            />
                        </div>
                        <div className='flex items-center py-1'>
                            <label className='w-5/12 md:w-2/12' htmlFor="Айран">Айран</label>
                            <input
                                className='border mx-10 px-2 w-7/12 md:w-2/12 py-1 m-auto'
                                id='Айран'
                                name='Айран'
                                type="number"
                                placeholder='0'
                                onChange={onChangeAdditives}
                            />
                        </div>
                        <div className='flex items-center py-1'>
                            <label className='w-5/12 md:w-2/12' htmlFor="Вилки">Вилки</label>
                            <input
                                className='border mx-10 px-2 w-7/12 md:w-2/12 py-1 m-auto'
                                id='Вилки'
                                name='Вилки'
                                type="number"
                                placeholder='0'
                                onChange={onChangeAdditives}
                            />
                        </div>
                    </div>
                </div>
                <div className='flex justify-start items-center'>
                    <span className='font-bold text-lg'>Стоимость</span>
                    <span className='px-5 text-orange-800'>143$</span>
                </div>
                <div className='flex justify-center'>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-10 py-5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleOk}
                    >
                        Добавить заказ
                    </button>
                </div>
            </div>
        </form>
    )
}

export default Form;