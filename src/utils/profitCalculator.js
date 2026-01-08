export const calculateProfit = (
  monthlyIncome,
  fuel,
  insurance,
  maintenance,
  tolls = 0
) => {
  // Step 1: Operating balance
  const operatingBalance =
    monthlyIncome - fuel - insurance - maintenance - tolls;

  // Step 2: Driver commission (10%)
  const driverCommission = operatingBalance * 0.1;

  // Step 3: Net profit
  const netProfit = operatingBalance - driverCommission;

  // Step 4: 33.33% split
  const share = netProfit / 3;

  return {
    operatingBalance,
    driverCommission,
    netProfit,
    tapiwaFamily: share,
    sunilFamily: share,
    carEMI: share,
  };
};
