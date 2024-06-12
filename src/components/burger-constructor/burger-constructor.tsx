import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { orderBurger, orderClose } from '../../services/slices/orderSlice';
import { clearIngredients } from '../../services/slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(
    (state) => state.burgerConstructor.constructorItems
  );
  const orderRequest = useSelector((state) => state.order.orderRequest);
  const orderModalData = useSelector((state) => state.order.orderModalData);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) return navigate('/login');

    dispatch(
      orderBurger([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map(
          (ingredient: TIngredient) => ingredient._id
        ),
        constructorItems.bun._id
      ])
    );
  };

  const closeOrderModal = () => {
    dispatch(clearIngredients());
    dispatch(orderClose());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
