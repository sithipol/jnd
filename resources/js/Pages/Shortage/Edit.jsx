import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import WarningButton from "@/Components/WarningButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, router } from "@inertiajs/react";
import { InertiaLink } from "@inertiajs/inertia-react";
import { useState } from "react";
import InputLabel from "@/Components/InputLabel";

export default function Edit({ auth, shortage }) {
    const [values, setValues] = useState({
        id: shortage.id || "",
        full_url: shortage.full_url || "",
        shortage_url: shortage.shortage_url || "",
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
        let a = router.patch("/shortage", values);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Shortage Edit
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <div className=" bg-white rounded shadow">
                                <form onSubmit={handleSubmit}>
                                    <div className="flex flex-wrap p-8 -mb-8 -mr-6 gap-2">
                                        <InputLabel>URL : </InputLabel>
                                        <TextInput
                                            className="w-full pb-8 pr-6 lg:w-1/3"
                                            label="Name"
                                            name="full_url"
                                            id="full_url"
                                            type="url"
                                            // errors={errors.full_url}
                                            value={values.full_url}
                                            onChange={handleChange}
                                        />
                                        <InputLabel>Shortage URL : </InputLabel>
                                        <TextInput
                                            className="w-full pb-8 pr-6 lg:w-1/3 bg-slate-200"
                                            label="Name"
                                            name="shortage_url"
                                            id="shortage_url"
                                            readOnly={true}
                                            // errors={errors.full_url}
                                            value={values.shortage_url}
                                            // onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex items-center px-8 py-4 gap-2">
                                        <PrimaryButton onSubmit={handleSubmit}>
                                            Update URL
                                        </PrimaryButton>
                                        <Link
                                            href={route("shortage.list")}
                                            className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                                        >
                                            <WarningButton>Back</WarningButton>
                                        </Link>
                                    </div>
                                    {/* <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
                                        {!organization.deleted_at && (
                                            <DeleteButton onDelete={destroy}>
                                                Delete Organization
                                            </DeleteButton>
                                        )}
                                        <LoadingButton
                                            loading={processing}
                                            type="submit"
                                            className="ml-auto btn-indigo"
                                        >
                                            Update Organization
                                        </LoadingButton>
                                    </div> */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
