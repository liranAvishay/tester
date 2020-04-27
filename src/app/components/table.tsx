import React, { useState, useEffect } from 'react';
import { Tester, Bug } from '../home';

interface TableProps {
    fetchData: Tester[] | [],
}
interface Sort {
    prop: string,
    isAsc: boolean
}

const Table: React.FC<TableProps> = (props) => {
    const { fetchData } = props
    const [data, setData] = useState<Tester[] | null>(null);
    const [sortList, setSortList] = useState<Sort[]>([])
    
    useEffect(() => {
        const initSort = (): Sort[] => {
            const sortList: Sort[] = [];
            for (const prop in fetchData[0]) {
                if (prop === "device") continue;
                sortList.push({
                    prop: prop,
                    isAsc: prop === 'firstName'
                })
            }
            return sortList;
        }

        sortBy('firstName', fetchData);
        setSortList(initSort())
    }, [fetchData])

    const sortBy = (prop: string, fetchData = data) => {
        if (prop === 'bugs') return;

        let sortedData: Tester[] | null = [];
        if (fetchData && !!fetchData.length) {
            const sort = sortList.find(s => s.prop === prop);
            sortedData = fetchData.sort((a: any, b: any) => {
                if (sort?.isAsc) {
                    return a[prop] < b[prop] ? 1 : -1
                }
                return a[prop] > b[prop] ? 1 : -1
            })
            setSortList(updateSort(prop))
        }
        setData(sortedData)
    }

    const updateSort = (prop: string): Sort[] => {
        const updatedSortList: Sort[] = sortList.map((s: Sort) => {
            if (s.prop === prop) {
                return {
                    prop: prop,
                    isAsc: !s.isAsc
                }
            }
            return s;
        });
        return updatedSortList;
    }

    const displayCell = (cellData: string | Bug[]) => {
        if (!Array.isArray(cellData)) {
            return <>{cellData}</>
        }
        return (
            <>{cellData.map(item => item.title).join(', ')}</>
        )
    }

    const renderRow = data && data.map((tester: Tester|any, index: number) => {
        const testerPropsArray = [];
        for(const prop in tester){
            if(prop !== 'device'){
                testerPropsArray.push(tester[prop])
            }
        }
        return (
            <tr key={index}>
                {testerPropsArray.map((cellData, index) => {
                    return <td key={index}>{displayCell(cellData)}</td>
                })}
            </tr>
        )
    })

    return (
        <>
            {data?.length ? <table className="table">
                <thead>
                    <tr>{Object.keys(data[0]).map((item) => {
                        if(item !== 'device')
                        return <th key={item} className={item !== 'bugs' ? 'cursor' : ''} onClick={() => sortBy(item)}>{item}</th>
                    })}</tr>
                </thead>
                <tbody>
                    {renderRow}
                </tbody>
            </table> : null}
        </>
    )
}

export default Table