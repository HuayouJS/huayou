
class Utils {
    static createSVGElement(tagName,attrs) {
        var svgNS = 'http://www.w3.org/2000/svg';
        var element = document.createElementNS(svgNS,tagName);
        for(var attr in attrs){
            element.setAttribute(attr,attrs[attr]);
        }
        return element;
    }
}


