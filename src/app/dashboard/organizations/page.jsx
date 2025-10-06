import React from "react";

const OrganizationsList = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-10 space-y-10">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-1 text-gray-900">
          Organization List
        </h2>
      </div>

      <div>
        <div className="overflow-x-auto bg-base-100 shadow rounded-xl">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 text-base font-semibold">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src="https://placekitten.com/80/80" alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Samirun Shuvo</div>
                      <div className="text-sm opacity-50">Frontend Developer</div>
                    </div>
                  </div>
                </td>
                <td>IT Department</td>
                <td>Senior Engineer</td>
                <td>
                  <span className="badge badge-success badge-outline">Active</span>
                </td>
                <td>
                  <div className="flex justify-center gap-3">
                    <button className="btn btn-sm btn-info">View</button>
                    <button className="btn btn-sm btn-warning">Edit</button>
                    <button className="btn btn-sm btn-error">Delete</button>
                  </div>
                </td>
              </tr>

              <tr>
                <td>2</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src="https://placebear.com/80/80" alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Rokibul Hossain</div>
                      <div className="text-sm opacity-50">Backend Developer</div>
                    </div>
                  </div>
                </td>
                <td>IT Department</td>
                <td>Software Engineer</td>
                <td>
                  <span className="badge badge-warning badge-outline">Pending</span>
                </td>
                <td>
                  <div className="flex justify-center gap-3">
                    <button className="btn btn-sm btn-info">View</button>
                    <button className="btn btn-sm btn-warning">Edit</button>
                    <button className="btn btn-sm btn-error">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrganizationsList;
