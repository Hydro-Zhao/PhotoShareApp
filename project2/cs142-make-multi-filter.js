"use strict";

function cs142MakeMultiFilter(originalArray) {
    let currentArray = originalArray.slice();
    function arrayFilterer(filterCriteria, callback) {
        if (typeof(filterCriteria) !== 'function') {
            return currentArray;
        } else {
            for (let i=0; i<currentArray.length;) {
                if (filterCriteria(currentArray[i])) {
                    i++;
                } else {
                    currentArray.splice(i, 1);
                }
            }
            if (typeof(callback) === 'function') {
                callback.call(originalArray, currentArray);
            }

        }

        return arrayFilterer;
    }

    return arrayFilterer;
}