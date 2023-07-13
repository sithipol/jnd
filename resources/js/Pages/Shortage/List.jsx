// import DangerButton from "@/Components/DangerButton";
// import NavLink from "@/Components/NavLink";
// import React from "react";
import { useState } from "react";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import WarningButton from "@/Components/WarningButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { InertiaLink } from "@inertiajs/inertia-react";
import { Head, Link, router } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import axios from "axios";

export default function Shortage({ auth, shortage }) {
    const [values, setValues] = useState({
        full_url: "",
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        router.post("/shortage", values);
    }
    async function handleDestroy(e) {
        e.preventDefault();
        const res = await axios.delete(`/shortage/${e.target.id}`);
        router.reload();
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Shortage
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <h1 className="mb-8 mt-2 ml-2 text-3xl font-bold">
                                Shortage List
                            </h1>
                            <form
                                className="flex flex-wrap p-8 mb-8 -mr-6 gap-2"
                                onSubmit={handleSubmit}
                            >
                                <InputLabel>URL : </InputLabel>
                                <TextInput
                                    className="w-full pb- pr-1 lg:w-1/2"
                                    label="Name"
                                    name="full_url"
                                    id="full_url"
                                    type="url"
                                    // errors={errors.full_url}
                                    value={values.full_url}
                                    onChange={handleChange}
                                />
                                <div className="flex items-center px-8 py-4 gap-2">
                                    <PrimaryButton>
                                        Generate Shortage URL
                                    </PrimaryButton>
                                </div>
                            </form>

                            <div className="overflow-x-auto bg-white rounded mt-5 shadow">
                                <table className="w-full whitespace-nowrap hover">
                                    <thead>
                                        <tr className="font-bold text-left">
                                            <th className="px-6 pt-5 pb-4">
                                                Id
                                            </th>
                                            <th className="px-6 pt-5 pb-4">
                                                Full Url
                                            </th>
                                            <th className="px-6 pt-5 pb-4">
                                                Shortage Url
                                            </th>
                                            <th
                                                className="px-6 pt-5 pb-4"
                                                colSpan="2"
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {shortage.data.map(
                                            ({
                                                id,
                                                full_url,
                                                shortage_url,
                                            }) => {
                                                return (
                                                    <tr
                                                        key={id}
                                                        className="hover:bg-gray-100 focus-within:bg-gray-100"
                                                    >
                                                        <td className="border-t">
                                                            <InertiaLink
                                                                // href={route(
                                                                //     "organizations.edit",
                                                                //     id
                                                                // )}
                                                                className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                                                            >
                                                                {id}
                                                                {/* {deleted_at && (
                                                                    <Icon
                                                                        name="trash"
                                                                        className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current"
                                                                    />
                                                                )} */}
                                                            </InertiaLink>
                                                        </td>
                                                        <td className="border-t">
                                                            <InertiaLink
                                                                // href={route(
                                                                //     "organizations.edit",
                                                                //     id
                                                                // )}
                                                                className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                                                            >
                                                                {full_url}
                                                                {/* {deleted_at && (
                                                                    <Icon
                                                                        name="trash"
                                                                        className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current"
                                                                    />
                                                                )} */}
                                                            </InertiaLink>
                                                        </td>

                                                        <td className="border-t ">
                                                            <Link
                                                                // tabIndex="-1"
                                                                href={route(
                                                                    "shortage.link",
                                                                    shortage_url
                                                                )}
                                                                className="flex items-center px-4 focus:outline-none"
                                                            >
                                                                {shortage_url}
                                                            </Link>
                                                        </td>
                                                        <td className="w-px border-t">
                                                            <Link
                                                                // tabIndex="-1"
                                                                href={route(
                                                                    "shortage.edit",
                                                                    id
                                                                )}
                                                                className="flex items-center px-4 focus:outline-none gap-2"
                                                            >
                                                                <WarningButton>
                                                                    Edit
                                                                </WarningButton>
                                                                <DangerButton
                                                                    id={id}
                                                                    onClick={
                                                                        handleDestroy
                                                                    }
                                                                >
                                                                    Delete
                                                                </DangerButton>
                                                            </Link>
                                                            {/* <DangerButton>
                                                                Delete
                                                            </DangerButton> */}
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                        {shortage.length === 0 && (
                                            <tr>
                                                <td
                                                    className="px-6 py-4 border-t"
                                                    colSpan="4"
                                                >
                                                    No organizations found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination class="mt-6" links={shortage.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
