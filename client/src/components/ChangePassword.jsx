import { Dialog, DialogTitle } from "@headlessui/react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import ModalWrapper from "./ModalWrapper";
import Textbox from "./Textbox";
import { useChangePasswordMutation } from "../redux/slices/api/userApiSlice";
import { toast } from "sonner";
import Loading from "./Loader";

const ChangePassword = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [chnageUserPassword, { isLoading }] = useChangePasswordMutation();
  const handleOnSubmit = async (data) => {
    console.log(data);
    if (data.password !== data.cpass) {
      toast.warning("Passwrod doesn't match");
      return;
    }
    try {
      const res = await chnageUserPassword(data).unwrap();
      toast.success("Password updated successfully");
      setTimeout(() => {
        setOpen(false);
      }, 500);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <DialogTitle
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            Change Password
          </DialogTitle>
          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="New Password"
              type="password"
              name="password"
              label="New Password"
              className="w-full rounded"
              register={register("password", {
                required: "New password is required",
              })}
              error={errors.password ? errors.password.message : ""}
            />
            <Textbox
              placeholder="Confirm New Password"
              type="password"
              name="cpass"
              label="Confirm New Password"
              className="w-full rounded"
              register={register("cpass", {
                required: "Confirm New Password is required",
              })}
              error={errors.cpass ? errors.cpass.message : ""}
            />
            {isLoading ? (
              <div className="py-5">
                <Loading />
              </div>
            ) : (
              <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
                <Button
                  type="submit"
                  className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-400"
                  label="Save"
                />
                <button
                  type="button"
                  className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default ChangePassword;
