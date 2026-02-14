import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';
import WithdrawMoney from '../../components/Shop/WithdrawMoney';

const ShopWithdrawMoneyPage = () => {
  const [active, setActive] = React.useState(7);
  return (
     <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[100px] md:w-[330px]">
          <DashboardSideBar active={active} setActive={setActive} />
        </div>
        <WithdrawMoney/>
      </div>
    </div>
  )
}

export default ShopWithdrawMoneyPage
