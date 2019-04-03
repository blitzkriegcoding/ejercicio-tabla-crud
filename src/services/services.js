// Servicio de paginación
getSlicePagination = (arrayRecords, pageFactor = 10, pageNumber = 1) => {
    let recordSlice = [];    
    if(pageFactor < 1 || arrayRecords.length == 0) return;  
    let slices = Math.floor(arrayRecords.length / pageFactor);  
    let arrayRecordsLength = arrayRecords.length;
    let arrayRecordsModule = arrayRecordsLength % pageFactor 
    if(pageNumber > slices) return; 
    if(pageNumber == slices) {
        if(arrayRecordsModule != 0) {
            recordSlice = arrayRecords.slice(slices * pageFactor, (slices * pageFactor) + (arrayRecordsLength % pageFactor));
        } else {            
            recordSlice = arrayRecords.slice((pageNumber - 1) * pageFactor, pageNumber * pageFactor);
        }
    } else if(pageNumber < slices) {
            if(arrayRecordsModule != 0) {
                // Little bug
                // if(pageNumber == 1) console.log(`Page number: ${pageNumber}`, `Recs by page: ${pageFactor}`, `${pageNumber * pageFactor}`, (pageNumber + 1) * pageFactor);
                // recordSlice = arrayRecords.slice(pageNumber * pageFactor, (pageNumber + 1) * pageFactor);
                recordSlice = arrayRecords.slice((pageNumber - 1) * pageFactor, pageNumber * pageFactor);
            } else {
                recordSlice = arrayRecords.slice((pageNumber - 1) * pageFactor, pageNumber * pageFactor);
            }           
    }  
    return recordSlice;
}

/*
Probado con 

getSlicePagination(p, 10, 100);
getSlicePagination(s, 10, 99);
*/

module.exports = {
    getSlicePagination
}