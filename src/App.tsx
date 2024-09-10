import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import Button, {ButtonTypes} from './components/Button';
import {useCallback, useMemo, useState} from 'react';
import {StatusBar} from 'expo-status-bar';

enum Operators {
  CLEAR = 'C',
  PLUS = '+',
  MINUS = '-',
  EQUAL = '=',
}

type Formula = number | Operators;

const App = () => {
  const [result, setResult] = useState(0);
  const [formula, setFormula] = useState<Formula[]>([]);
  const {width: windowWidth} = useWindowDimensions();
  const width = useMemo(() => (windowWidth - 5) / 4, [windowWidth]);

  const calculate = useCallback(() => {
    let calculateNumber = 0;
    let operator = '';

    formula.forEach((value) => {
      if (
        typeof value === 'string' &&
        [Operators.PLUS, Operators.MINUS].includes(value)
      ) {
        operator = value;
      } else if (typeof value === 'number') {
        if (operator === Operators.PLUS) {
          calculateNumber += value;
        } else if (operator === Operators.MINUS) {
          calculateNumber -= value;
        } else {
          calculateNumber = value;
        }
      }
    });
    setResult(calculateNumber);
    setFormula([calculateNumber]);
  }, [formula]);

  const onPressOperator = useCallback(
    (operator: Operators) => {
      switch (operator) {
        case Operators.CLEAR:
          setFormula([]);
          setResult(0);
          return;
        case Operators.EQUAL:
          calculate();
          return;
        default: {
          const last = formula[formula.length - 1];
          if (
            typeof last === 'string' &&
            [Operators.PLUS, Operators.MINUS].includes(last)
          ) {
            setFormula((prev) => {
              prev.pop();
              return [...prev, operator];
            });
          } else {
            setFormula((prev) => [...prev, operator]);
          }
          return;
        }
      }
    },
    [calculate, formula],
  );

  const onPressNumber = useCallback(
    (number: number) => {
      const lastFormula = formula[formula.length - 1];
      if (typeof lastFormula === 'string') {
        setResult(number);
        setFormula((prev) => [...prev, number]);
      } else {
        const newNumber = (lastFormula ?? 0) * 10 + number;
        setResult(newNumber);
        setFormula((prev) => {
          prev.pop();
          return [...prev, newNumber];
        });
      }
    },
    [formula],
  );

  return (
    <View style={styles.container}>
      <StatusBar style={'light'} />
      <View style={styles.resultContainer}>
        <Text style={styles.text}>{result.toLocaleString()}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.leftPad}>
          <View style={styles.number}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <Button
                key={`Calculator-num-${num}`}
                title={num.toString()}
                onPress={() => onPressNumber(num)}
                buttonType={ButtonTypes.NUMBER}
                buttonStyle={{
                  width: width,
                  height: width,
                  marginBottom: 1,
                }}
              />
            ))}
          </View>
          <View style={styles.bottom}>
            <Button
              title={'0'}
              onPress={() => onPressNumber(0)}
              buttonType={ButtonTypes.NUMBER}
              buttonStyle={{
                width: width * 2,
                height: width,
                marginTop: 1,
              }}
            />
            <Button
              title={Operators.EQUAL}
              onPress={() => onPressOperator(Operators.EQUAL)}
              buttonType={ButtonTypes.OPERATOR}
              buttonStyle={{
                width,
                height: width,
                marginTop: 1,
              }}
            />
          </View>
        </View>
        <View>
          <Button
            title={Operators.CLEAR}
            onPress={() => onPressOperator(Operators.CLEAR)}
            buttonType={ButtonTypes.OPERATOR}
            buttonStyle={{width, height: width, marginTop: 1}}
          />
          <Button
            title={Operators.MINUS}
            onPress={() => onPressOperator(Operators.MINUS)}
            buttonType={ButtonTypes.OPERATOR}
            buttonStyle={{width, height: width, marginTop: 1}}
          />
          <Button
            title={Operators.PLUS}
            onPress={() => onPressOperator(Operators.PLUS)}
            buttonType={ButtonTypes.OPERATOR}
            buttonStyle={{width, height: width * 2 + 1, marginTop: 1}}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  text: {
    fontSize: 60,
    fontWeight: '700',
    color: '#FFF',
    paddingBottom: 30,
    paddingRight: 30,
  },
  resultContainer: {
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  buttonContainer: {
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  leftPad: {
    width: '75%',
  },
  number: {
    flexWrap: 'wrap-reverse',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  error: {
    color: 'red',
  },
  button: {
    width: 100,
    height: 100,
  },
});

export default App;
