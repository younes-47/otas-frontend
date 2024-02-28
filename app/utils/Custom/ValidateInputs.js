export const ValidateInputs = (
  setModalVisibility,
  setModalBody,
  setModalHeader,
  setModalSevirity,
  data,
  setActualRequester,
  totalMAD = 0.0,
  totalEUR = 0.0,
) => {
  // Invalid on behalf selection
  if (data.onBehalf !== true && data.onBehalf !== false) {
    setModalHeader('invalidInformationHeader');
    setModalBody('invalidOnBehalf');
    setModalSevirity('error');
    setModalVisibility(true);
    return false;
  }

  // on behalf of someone + missing actual requester info
  if (
    data.onBehalf === true &&
    (!data.actualRequester?.firstName ||
      !data.actualRequester?.lastName ||
      !data.actualRequester?.registrationNumber ||
      !data.actualRequester?.jobTitle ||
      !data.actualRequester?.department ||
      !data.actualRequester?.managerUserName)
  ) {
    setModalHeader('invalidInformationHeader');
    setModalBody('invalidActualRequesterInformation');
    setModalSevirity('error');
    setModalVisibility(true);
    return false;
  }

  // invalid abroad selection
  if ('Abroad' in data) {
    if (data.Abroad !== true && data.Abroad !== false) {
      setModalHeader('invalidInformationHeader');
      setModalBody('invalidAbroadSelection');
      setModalSevirity('error');
      setModalVisibility(true);
      return false;
    }
  }

  // if on behalf is false -> set actual requester to null
  if (data.onBehalf === false) {
    setActualRequester(null);
  }

  // Description
  if (data.description === '') {
    setModalHeader('invalidInformationHeader');
    setModalBody('invalidDescription');
    setModalSevirity('error');
    setModalVisibility(true);
    return false;
  }

  let isAllGood = true;

  // Trips
  if ('trips' in data) {
    const copiedTrips = [...data?.trips];
    const sortedTrips = copiedTrips.sort(
      (a, b) => new Date(a.departureDate) - new Date(b.departureDate),
    );
    sortedTrips.forEach((trip) => {
      // Blank input
      if (
        trip?.departurePlace === '' ||
        trip?.destination === '' ||
        !trip?.departureDate ||
        !trip?.arrivalDate ||
        trip?.transportationMethod === '' ||
        trip?.unit === ''
      ) {
        setModalHeader('invalidInformationHeader');
        setModalBody('missingTripInformation');
        setModalSevirity('error');
        setModalVisibility(true);
        isAllGood = false;
      }

      // value = 0
      if (trip?.value <= 0 || trip?.value === '0') {
        setModalHeader('invalidInformationHeader');
        setModalBody('invalidTripValue');
        setModalSevirity('error');
        setModalVisibility(true);
        isAllGood = false;
      }

      // value is blank
      if (
        trip?.value === '' ||
        totalMAD.isNaN === true ||
        totalEUR.isNaN === true
      ) {
        setModalHeader('invalidInformationHeader');
        setModalBody('blankTripValue');
        setModalSevirity('error');
        setModalVisibility(true);
        isAllGood = false;
      }

      // ArrivalDate < DepartureDate
      if (new Date(trip?.departureDate) > new Date(trip?.arrivalDate)) {
        setModalHeader('invalidInformationHeader');
        setModalBody('invalidTripDates');
        setModalSevirity('error');
        setModalVisibility(true);
        isAllGood = false;
      }

      // Arrival date of current trip shouldn't be bigger than the departuredate of the next trip
      // Prevent out of range index exception

      if (sortedTrips.indexOf(trip) < sortedTrips.length - 1) {
        const nextTrip = sortedTrips[sortedTrips.indexOf(trip) + 1];
        if (new Date(trip.arrivalDate) > new Date(nextTrip.departureDate)) {
          setModalHeader('invalidInformationHeader');
          setModalBody('nonsenseTripDates');
          setModalSevirity('error');
          setModalVisibility(true);
          isAllGood = false;
        }
      }
    });
  }

  data.expenses?.forEach((expense) => {
    // expense description
    if (expense?.description === '' || !expense?.description) {
      setModalHeader('invalidInformationHeader');
      setModalBody('expenseDescriptionNotSpecified');
      setModalSevirity('error');
      setModalVisibility(true);
      isAllGood = false;
    }
    // expense currency
    if ('currency' in expense) {
      if (expense?.currency !== 'MAD' && expense?.currency !== 'EUR') {
        setModalHeader('invalidInformationHeader');
        setModalBody('expenseCurrencyNotSpecified');
        setModalSevirity('error');
        setModalVisibility(true);
        isAllGood = false;
      }
    }
    // fee = 0
    if (expense?.estimatedFee <= 0 || expense?.estimatedFee === '0') {
      setModalHeader('invalidInformationHeader');
      setModalBody('expenseFeeInvalid');
      setModalSevirity('error');
      setModalVisibility(true);
      isAllGood = false;
    }
    // value is blank
    if (
      expense?.estimatedFee === '' ||
      totalMAD.isNaN === true ||
      totalEUR.isNaN === true
    ) {
      setModalHeader('invalidInformationHeader');
      setModalBody('invalidExpenseFeeValue');
      setModalSevirity('error');
      setModalVisibility(true);
      isAllGood = false;
    }
    // expense date is invalid
    if (
      expense?.expenseDate === null ||
      expense?.expenseDate === '' ||
      !expense?.expenseDate
    ) {
      setModalHeader('invalidInformationHeader');

      setModalBody('expenseDateNotSet');
      setModalSevirity('error');
      setModalVisibility(true);
      isAllGood = false;
    }
  });

  if ('receiptsFile' in data) {
    // Receipts file
    if (data.receiptsFile === '') {
      setModalHeader('invalidInformationHeader');

      setModalBody('invalidReceiptsFile');
      setModalSevirity('error');
      setModalVisibility(true);
      isAllGood = false;
    }
  }

  return isAllGood;
};

export const ValidateLiquidationInputs = (
  setModalVisibility,
  setModalBody,
  setModalHeader,
  setModalSevirity,
  data,
  actualTotal,
) => {
  let isAllGood = true;

  // validate expenses to liquidate if exist
  if (data.expensesLiquidations?.length > 0) {
    data.expensesLiquidations?.forEach((expense) => {
      // value is 0 or left out blank or anything other than an actual number
      if (expense?.actualFee < 0 || expense?.actualFee.isNaN) {
        setModalHeader('invalidInformationHeader');
        setModalBody('invalidExpensesActualFee');
        setModalSevirity('error');
        setModalVisibility(true);
        isAllGood = false;
      }
    });
  }

  // validate trips to liquidate if exist
  if ('tripsLiquidations' in data) {
    data.tripsLiquidations?.forEach((trip) => {
      // value is 0 or left out blank or anything other than an actual number
      if (
        trip?.actualFee <= 0 ||
        trip?.actualFee === '0' ||
        trip?.actualFee.isNaN
      ) {
        setModalHeader('invalidInformationHeader');
        setModalBody('invalidTripsActualFee');
        setModalSevirity('error');
        setModalVisibility(true);
        isAllGood = false;
      }
    });
  }

  // validate new trips if exist
  if ('newTrips' in data) {
    const copiedTrips = [...data?.newTrips];
    const sortedTrips = copiedTrips.sort(
      (a, b) => new Date(a.departureDate) - new Date(b.departureDate),
    );
    sortedTrips.forEach((trip) => {
      // Blank input
      if (
        trip?.departurePlace === '' ||
        trip?.destination === '' ||
        !trip?.departureDate ||
        !trip?.arrivalDate ||
        trip?.transportationMethod === '' ||
        trip?.unit === ''
      ) {
        setModalHeader('invalidInformationHeader');
        setModalBody('missingTripsInfo');
        setModalSevirity('error');
        setModalVisibility(true);
        isAllGood = false;
      }

      // value = 0
      if (trip?.value < 0) {
        setModalHeader('invalidInformationHeader');
        setModalBody('invalidTripValue');
        setModalSevirity('error');
        setModalVisibility(true);
        isAllGood = false;
      }

      // value is blank
      if (
        trip?.value === '' ||
        actualTotal.isNaN === true ||
        actualTotal.isNaN === true
      ) {
        setModalHeader('invalidInformationHeader');
        setModalBody('blankTripsValue');
        setModalSevirity('error');
        setModalVisibility(true);
        isAllGood = false;
      }

      // ArrivalDate < DepartureDate
      if (trip?.departureDate > trip?.arrivalDate) {
        setModalHeader('invalidInformationHeader');
        setModalBody('invalidTripsDates');
        setModalSevirity('error');
        setModalVisibility(true);
        isAllGood = false;
      }

      // Arrival date of current trip shouldn't be bigger than the departuredate of the next trip
      // Prevent out of range index exception
      if (trip !== sortedTrips.at(sortedTrips.length - 1)) {
        if (
          trip.arrivalDate >
          sortedTrips.at(sortedTrips.length - 1).departureDate
        ) {
          setModalHeader('invalidInformationHeader');
          setModalBody('nonsenseTripsDates');
          setModalSevirity('error');
          setModalVisibility(true);
          isAllGood = false;
        }
      }
    });
  }

  // validate new expenses if exist
  if (data.newExpenses?.length > 0) {
    data.newExpenses?.forEach((expense) => {
      // expense description
      if (expense?.description === '' || !expense?.description) {
        setModalHeader('invalidInformationHeader');
        setModalBody('invalidExpenseDescription');
        setModalSevirity('error');
        setModalVisibility(true);
        isAllGood = false;
      }
      // expense currency
      if ('currency' in expense) {
        if (expense?.currency !== 'MAD' && expense?.currency !== 'EUR') {
          setModalHeader('invalidInformationHeader');
          setModalBody('invalidExpenseCurrency');
          setModalSevirity('error');
          setModalVisibility(true);
          isAllGood = false;
        }
      }
      // fee = 0
      if (expense?.estimatedFee <= 0 || expense?.estimatedFee === '0') {
        setModalHeader('invalidInformationHeader');
        setModalBody('invalidExpenseValue');
        setModalSevirity('error');
        setModalVisibility(true);
        isAllGood = false;
      }
      // value is blank
      if (
        expense?.estimatedFee === '' ||
        actualTotal.isNaN === true ||
        actualTotal.isNaN === true
      ) {
        setModalHeader('invalidInformationHeader');
        setModalBody('blankExpenseValue');
        setModalSevirity('error');
        setModalVisibility(true);
        isAllGood = false;
      }
      // expense date is invalid
      if (
        expense?.expenseDate === null ||
        expense?.expenseDate === '' ||
        !expense?.expenseDate
      ) {
        setModalHeader('invalidInformationHeader');

        setModalBody('invalidExpenseDate');
        setModalSevirity('error');
        setModalVisibility(true);
        isAllGood = false;
      }
    });
  }

  // validate file
  if (data.receiptsFile === '') {
    setModalHeader('invalidInformationHeader');

    setModalBody('invalidReceiptsFile');
    setModalSevirity('error');
    setModalVisibility(true);
    isAllGood = false;
  }

  return isAllGood;
};

export const ValidateDeciderComment = (
  setModalVisibility,
  setModalBody,
  setModalHeader,
  setModalSevirity,
  deciderComment,
) => {
  let isAllGood = true;
  if (deciderComment === '') {
    setModalHeader('invalidComment');
    setModalBody('blankComment');
    setModalSevirity('danger');
    setModalVisibility(true);
    isAllGood = false;
  }
  if (deciderComment.length > 255) {
    setModalHeader('invalidComment');

    setModalBody('longComment');
    setModalSevirity('danger');
    setModalVisibility(true);
    isAllGood = false;
  }
  return isAllGood;
};
