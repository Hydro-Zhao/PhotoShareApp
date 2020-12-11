"use strict";

function Cs142TemplateProcessor(template) {
    this.template = template;
}

Cs142TemplateProcessor.prototype.fillIn = function(dictionary) {
    return this.template.replace(/{{([^}]*)}}/g, function(match, p1) { 
        return dictionary[p1] ? dictionary[p1] : "";
    });
};

export default Cs142TemplateProcessor;