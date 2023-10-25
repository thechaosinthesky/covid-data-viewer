export function formatData(data: any[]): any[]{
    return data.map((obj, i) => {
        obj['id'] = i;
        const casesPer100k = (obj.cases / obj.population) * 100000;
        obj['casesPer100k'] = Math.floor(casesPer100k);
        return obj;
    });
}
