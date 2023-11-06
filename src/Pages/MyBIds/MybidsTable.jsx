const MybidsTable = () => {
  return (
    <div>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
          John Brown
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
          45
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
          New York No. 1 Lake Park
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <a className="text-blue-500 hover:text-blue-700" href="#">
            Delete
          </a>
        </td>
      </tr>
    </div>
  );
};

export default MybidsTable;
