import React, { useMemo } from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './quoteProductOptions.module.css';

const QuoteProductOptions = props => {
    const { options = [] } = props;

    const classes = useStyle(defaultClasses, props.classes);

    const displayOptions = useMemo(
        () =>
            options.map(({ option_label, value_label }) => {
                const key = `${option_label}${value_label}`;
                const optionLabelString = `${option_label} :`;
                return (
                    <div key={key} className={classes.optionLabel}>
                        <dt className={classes.optionName}>{optionLabelString}</dt>
                        <dd className={classes.optionValue}>{value_label}</dd>
                    </div>
                );
            }),
        [classes, options]
    );

    if (displayOptions.length === 0) {
        return null;
    }

    return <dl className={classes.options}>{displayOptions}</dl>;
};

QuoteProductOptions.propTypes = {
    options: arrayOf(
        shape({
            label: string,
            value: string
        })
    )
};

export default QuoteProductOptions;
