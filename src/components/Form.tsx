import { useState } from 'react';

const enum TYPES_OF_CALCULATIONS {
  CARBS_IN_100_GRAMS = 'carbs-in-100-grams',
  DESIRED_GRAMS_OF_CARBS = 'desired-grams-of-carbs',
  GRAMS_OF_FOOD = 'grams-of-food',
}

declare type InputType = number | '';

export const Form = () => {
  const [carbsIn100Grams, setCarbsIn100Grams] = useState<InputType>('');
  const [gramsOfCarbs, setDesiredGramsOfCarbs] = useState<InputType>('');
  const [gramsOfFood, setGramsOfFood] = useState<InputType>('');

  const [calculateBy, setCalculateBy] = useState<string>(
    TYPES_OF_CALCULATIONS.GRAMS_OF_FOOD
  );

  const calculate = ({
    carbsIn100Grams,
    gramsOfCarbs,
    gramsOfFood,
  }: {
    carbsIn100Grams: InputType;
    gramsOfCarbs: InputType;
    gramsOfFood: InputType;
  }) => {
    switch (calculateBy) {
      case TYPES_OF_CALCULATIONS.CARBS_IN_100_GRAMS:
        setCarbsIn100Grams(calculateCarbsIn100Grams(gramsOfCarbs, gramsOfFood));
        break;
      case TYPES_OF_CALCULATIONS.DESIRED_GRAMS_OF_CARBS:
        setDesiredGramsOfCarbs(
          calculateDesiredGramsOfCarbs(carbsIn100Grams, gramsOfFood)
        );
        break;
      case TYPES_OF_CALCULATIONS.GRAMS_OF_FOOD:
        setGramsOfFood(calculateGramsOfFood(carbsIn100Grams, gramsOfCarbs));
        break;
      default:
        break;
    }
  };

  const calculateCarbsIn100Grams = (
    gramsOfCarbs: InputType,
    gramsOfFood: InputType
  ) => {
    if (gramsOfCarbs !== '' && gramsOfFood !== '') {
      const x = gramsOfCarbs / gramsOfFood;
      const y = 100 * x;
      return Number(y.toFixed(2));
    } else {
      return '';
    }
  };

  const calculateDesiredGramsOfCarbs = (
    carbsIn100Grams: InputType,
    gramsOfFood: InputType
  ) => {
    if (gramsOfFood !== '' && carbsIn100Grams !== '') {
      const x = carbsIn100Grams / 100;
      const y = gramsOfFood * x;
      return Number(y.toFixed(2));
    } else {
      return '';
    }
  };

  const calculateGramsOfFood = (
    carbsIn100Grams: InputType,
    gramsOfCarbs: InputType
  ) => {
    if (carbsIn100Grams !== '' && gramsOfCarbs !== '') {
      const x = 100 / carbsIn100Grams;
      const y = gramsOfCarbs * x;
      return Number(y.toFixed(2));
    } else {
      return '';
    }
  };

  return (
    <div>
      <h2>ממיר אוכל</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <input
            type="radio"
            checked={calculateBy === TYPES_OF_CALCULATIONS.CARBS_IN_100_GRAMS}
            onChange={() => {
              setCalculateBy(TYPES_OF_CALCULATIONS.CARBS_IN_100_GRAMS);
            }}
          />
          <div>ערכים לפי 100 גרם:</div>
          <input
            disabled={calculateBy === TYPES_OF_CALCULATIONS.CARBS_IN_100_GRAMS}
            type="number"
            value={carbsIn100Grams}
            onChange={(e) => {
              const newCarbsIn100Grams =
                e.target.value === '' ? '' : Number(e.target.value);
              setCarbsIn100Grams(newCarbsIn100Grams);
              calculate({
                carbsIn100Grams: newCarbsIn100Grams,
                gramsOfFood,
                gramsOfCarbs,
              });
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <input
            type="radio"
            checked={
              calculateBy === TYPES_OF_CALCULATIONS.DESIRED_GRAMS_OF_CARBS
            }
            onChange={() => {
              setCalculateBy(TYPES_OF_CALCULATIONS.DESIRED_GRAMS_OF_CARBS);
            }}
          />
          <div>סה"כ גרם ערכים במנה:</div>
          <input
            disabled={
              calculateBy === TYPES_OF_CALCULATIONS.DESIRED_GRAMS_OF_CARBS
            }
            type="number"
            value={gramsOfCarbs}
            onChange={(e) => {
              const newDesiredGramsOfCarbs =
                e.target.value === '' ? '' : Number(e.target.value);
              setDesiredGramsOfCarbs(newDesiredGramsOfCarbs);
              calculate({
                carbsIn100Grams,
                gramsOfFood,
                gramsOfCarbs: newDesiredGramsOfCarbs,
              });
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <input
            type="radio"
            checked={calculateBy === TYPES_OF_CALCULATIONS.GRAMS_OF_FOOD}
            onChange={() => {
              setCalculateBy(TYPES_OF_CALCULATIONS.GRAMS_OF_FOOD);
            }}
          />
          <div>גרם מזון סה"כ:</div>
          <input
            disabled={calculateBy === 'grams-of-food'}
            type="number"
            value={gramsOfFood}
            onChange={(e) => {
              const newGramsOfFood =
                e.target.value === '' ? '' : Number(e.target.value);
              setGramsOfFood(newGramsOfFood);
              calculate({
                carbsIn100Grams,
                gramsOfFood: newGramsOfFood,
                gramsOfCarbs,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};
