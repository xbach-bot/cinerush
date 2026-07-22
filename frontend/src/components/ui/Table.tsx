import React from 'react';
import './ui.css';

export interface Column<T> {
  header: React.ReactNode;
  accessor?: keyof T;
  render?: (row: T, index: number) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T, index: number) => string | number;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  emptyMessage = 'Không có dữ liệu hiển thị',
  className = '',
}: TableProps<T>): React.ReactElement {
  return (
    <div className={`table-container ${className}`}>
      <table className="ui-table">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                style={{
                  width: col.width,
                  textAlign: col.align || 'left',
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={columns.length}>
                <div className="loading-wrapper">
                  <div className="spinner spinner-md" aria-label="Loading spinner" />
                  <p className="loading-text">Đang tải dữ liệu...</p>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>
                <div className="state-box">
                  <div className="state-icon">📭</div>
                  <h4 className="state-title">Không có dữ liệu</h4>
                  <p className="state-desc">{emptyMessage}</p>
                </div>
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={keyExtractor(row, rowIndex)}>
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    style={{ textAlign: col.align || 'left' }}
                  >
                    {col.render
                      ? col.render(row, rowIndex)
                      : col.accessor !== undefined && col.accessor !== null
                      ? String((row as Record<string, unknown>)[col.accessor as string] ?? '')
                      : null}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
