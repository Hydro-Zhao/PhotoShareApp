'use strict';

import Cs142TemplateProcessor from '../project2/cs142-template-Cs142TemplateProcessor.js'

class TableTemplate {
    static fillIn(id, dict, columnName) {
        let table = document.getElementById(id);

        let headerTemplate = new Cs142TemplateProcessor(table.rows[0].innerHTML);
        table.rows[0].innerHTML = headerTemplate.fillIn(dict);

        if (columnName) {
            let index = -1;
            for (let i = 0; i < table.rows[0].cells.length; i++) {
                if (table.rows[0].cells[i].textContent === columnName) {
                    index = i;
                    break;
                }
            }
            if (index === -1) {
                return;
            }

            for (let i = 1; i < table.rows.length; i++) {
                let cellTemplate = new Cs142TemplateProcessor(table.rows[i].cells[index].innerHTML);
                table.rows[i].cells[index].innerHTML = cellTemplate.fillIn(dict);
            }

        } else {
            for (let i = 0; i < table.rows.length; i++) {
                let rowTemplate = new Cs142TemplateProcessor(table.rows[i].innerHTML);
                table.rows[i].innerHTML = rowTemplate.fillIn(dict);
            }
        }
        table.style.visibility = 'visible';
    }
}
