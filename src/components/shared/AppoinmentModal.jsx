"use client";
import { Calendar, Form, Input, Modal, TimePicker, ConfigProvider } from "antd";
import { useState } from "react";
import {
  useAddAppointmentMutation,
  useGetUnavailableQuery,
} from "@/redux/Api/webmanageApi";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";

const AppoinmentModal = ({ openResponsive, setOpenResponsive }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [appointmentData, setAppointmentData] = useState();

  const tabContent = [
    <TabOne
      setActiveTab={setActiveTab}
      setAppointmentData={setAppointmentData}
    />,
    <TabTwo
      setActiveTab={setActiveTab}
      appointmentData={appointmentData}
      setAppointmentData={setAppointmentData}
      setOpenResponsive={setOpenResponsive}
    />,
  ];

  return (
    <Modal
      title=""
      centered
      open={openResponsive}
      onCancel={() => setOpenResponsive(false)}
      footer={null}
      width={{
        xs: "90%",
        sm: "80%",
        md: "60%",
        lg: "50%",
        xl: "40%",
        xxl: "30%",
      }}
    >
      <div>
        {/* <h1 className="text-xl font-semibold text-center pb-4">
          Book An Appointment
        </h1>
        <div className="bg-[#F5F5F5] p-4">
          <h1>Showroom Location</h1>
          <p>Dhaka, Banasree</p>
        </div> */}
        {tabContent[activeTab]}
      </div>
    </Modal>
  );
};

export default AppoinmentModal;

const TabOne = ({ setActiveTab, setAppointmentData }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [currentMonth, setCurrentMonth] = useState(dayjs().month() + 1);
  const [currentYear, setCurrentYear] = useState(dayjs().year());

  const { data: unAvailableAppointment } = useGetUnavailableQuery({
    month: currentMonth,
    year: currentYear,
  });

  const unavailableDates =
    unAvailableAppointment?.availableTimes?.map((item) =>
      dayjs(item.start).format("YYYY-MM-DD")
    ) || [];

  const disabledDate = (current) => {
    const formattedDate = current.format("YYYY-MM-DD");
    return unavailableDates.includes(formattedDate);
  };

  const onFinish = (values) => {
    const startDateTime = dayjs(
      `${selectedDate.format("YYYY-MM-DD")}T${values.start.format("HH:mm:ss")}`
    );
    const endDateTime = dayjs(
      `${selectedDate.format("YYYY-MM-DD")}T${values.end.format("HH:mm:ss")}`
    );

    const tab1Data = {
      start: startDateTime.isValid() ? startDateTime.toISOString() : null,
      end: endDateTime.isValid() ? endDateTime.toISOString() : null,
    };

    setAppointmentData((p) => ({ ...p, ...tab1Data }));
    setActiveTab(1);
  };
  return (
    <div key="1">
      <ConfigProvider
        theme={{
          components: {
            "Checkbox": {
              "colorPrimary": "rgb(0,0,0)",
              "colorPrimaryBorder": "rgb(0,0,0)",
              "colorPrimaryHover": "rgb(0,0,0)"
            },
            "Slider": {
              "trackBg": "rgb(120,120,120)",
              "trackHoverBg": "rgb(126,126,126)",
              "colorPrimaryBorderHover": "rgb(0,0,0)",
              "colorFillContentHover": "rgba(0,0,0,0.15)",
              "handleActiveColor": "rgb(0,0,0)",
              "handleColor": "rgb(0,0,0)",
              "dotActiveBorderColor": "rgb(22,22,22)",
              "handleActiveOutlineColor": "rgba(105,105,105,0.2)"
            },
            "Select": {
              "activeBorderColor": "rgb(0,0,0)",
              "hoverBorderColor": "rgb(0,0,0)",
              "activeOutlineColor": "rgba(88,88,88,0.1)",
              "colorPrimary": "rgb(0,0,0)",
              "controlHeight": 40,
              "borderRadius": 2,
              "optionSelectedBg": "rgb(242,242,242)"
            },
            "Input": {
              "activeBorderColor": "rgb(0,0,0)",
              "hoverBorderColor": "rgb(0,0,0)",
              "colorPrimaryActive": "rgb(0,0,0)",
              "colorPrimaryHover": "rgb(0,0,0)",
              "colorPrimary": "rgb(0,0,0)",
            },
            "Radio": {
              "colorPrimary": "rgb(0,0,0)",
              "colorPrimaryActive": "rgb(0,0,0)",
              "colorPrimaryBorder": "rgb(98,100,102)",
              "colorPrimaryHover": "rgb(20,20,20)"
            },
            "TimePicker": {
              "activeBorderColor": "rgb(0,0,0)",
              "cellHoverWithRangeBg": "rgba(0,0,0,0.1)",
              "cellRangeBorderColor": "rgb(0,0,0)",
              "hoverBorderColor": "rgb(0,0,0)",
            },
            "Calendar": {
              "colorPrimary": "rgb(0,0,0)",
              "itemActiveBg": "rgb(228,228,228)"
            }
          },
        }}
      >
        <h1 className="text-xl font-semibold pt-5">Select Date & Time</h1>
        <Calendar
          className="w-full"
          fullscreen={false}
          onPanelChange={(value) => {
            setCurrentMonth(value.month() + 1);
            setCurrentYear(value.year());
          }}
          onSelect={(value) => setSelectedDate(value)}
          disabledDate={disabledDate}
        />
        <Form onFinish={onFinish} className="md:grid grid-cols-2 gap-3 mt-11">
          {/* <h1 className="text-lg font-semibold pb-2 col-span-2">
            Available Time
          </h1> */}
          <p className="text-lg font-semibold pt-2 col-span-2">
            Office hours are available from 9 AM to 5 PM.
          </p>
          <div>
            <h1>From</h1>
            <Form.Item
              name="start"
              rules={[{ required: true, message: "Please select start time" }]}
            >
              <TimePicker
                style={{ borderRadius: "0px" }}
                className="w-full"
                use12Hours
                format="h:mm a"
              />
            </Form.Item>
          </div>
          <div>
            <h1>To</h1>
            <Form.Item
              name="end"
              rules={[{ required: true, message: "Please select end time" }]}
            >
              <TimePicker
                style={{ borderRadius: "0px" }}
                className="w-full"
                use12Hours
                format="h:mm a"
              />
            </Form.Item>
          </div>
          <button
            className="col-span-2 w-full bg-black text-white py-2 mt-6 cursor-pointer"
            type="submit"
          >
            Continue
          </button>
        </Form>
      </ConfigProvider>
    </div>
  );
};

const TabTwo = ({ setActiveTab, appointmentData, setOpenResponsive }) => {
  const [form] = useForm();
  const [addApointment, { isLoading }] = useAddAppointmentMutation();

  const onFinish = async (values) => {
    const postData = { ...values, ...appointmentData };
    try {
      const response = await addApointment(postData).unwrap();
      toast.success(response.message);
      form.resetFields();
      setActiveTab(0);
      setOpenResponsive(false);
    } catch (error) {
      toast.error(error.data.message);
      setActiveTab(0)
    } 
    // finally {
    //   setActiveTab(0);
    //   setOpenResponsive(false);
    //   form.resetFields();
    // }
  };
  return (
    <div key="2">
      <h1 className="text-xl font-semibold pt-5 pb-4">Personal Information</h1>
      <ConfigProvider
        theme={{
          components: {
            "Checkbox": {
              "colorPrimary": "rgb(0,0,0)",
              "colorPrimaryBorder": "rgb(0,0,0)",
              "colorPrimaryHover": "rgb(0,0,0)"
            },
            "Slider": {
              "trackBg": "rgb(120,120,120)",
              "trackHoverBg": "rgb(126,126,126)",
              "colorPrimaryBorderHover": "rgb(0,0,0)",
              "colorFillContentHover": "rgba(0,0,0,0.15)",
              "handleActiveColor": "rgb(0,0,0)",
              "handleColor": "rgb(0,0,0)",
              "dotActiveBorderColor": "rgb(22,22,22)",
              "handleActiveOutlineColor": "rgba(105,105,105,0.2)"
            },
            "Select": {
              "activeBorderColor": "rgb(0,0,0)",
              "hoverBorderColor": "rgb(0,0,0)",
              "activeOutlineColor": "rgba(88,88,88,0.1)",
              "colorPrimary": "rgb(0,0,0)",
              "controlHeight": 40,
              "borderRadius": 2,
              "optionSelectedBg": "rgb(242,242,242)"
            },
            "Input": {
              "activeBorderColor": "rgb(0,0,0)",
              "hoverBorderColor": "rgb(0,0,0)",
              "colorPrimaryActive": "rgb(0,0,0)",
              "colorPrimaryHover": "rgb(0,0,0)",
              "colorPrimary": "rgb(0,0,0)",
            },
            "Radio": {
              "colorPrimary": "rgb(0,0,0)",
              "colorPrimaryActive": "rgb(0,0,0)",
              "colorPrimaryBorder": "rgb(98,100,102)",
              "colorPrimaryHover": "rgb(20,20,20)"
            },
          },
        }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please write a Name" }]}
          >
            <Input
              style={{ padding: "9px", borderRadius: "0px" }}
              placeholder="Enter your Full Name"
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please write an Email" }]}
          >
            <Input
              style={{ padding: "9px", borderRadius: "0px" }}
              placeholder="Enter Email"
            />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: "Please write a Number" }]}
          >
            <Input
              style={{ padding: "9px", borderRadius: "0px" }}
              type="Number"
              placeholder="Enter Phone Number"
            />
          </Form.Item>
          <Form.Item label="Note" name="notes" rules={[{ required: true, message: "Please write note" }]}>
            <Input.TextArea
              style={{ borderRadius: "0px" }}
              rows={4}
              placeholder="Write your review here..."
            />
          </Form.Item>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setActiveTab(0)}
              className="w-full border text-black py-2 cursor-pointer"
            >
              Back
            </button>
            <button type="submit" disabled={isLoading} className="w-full bg-black text-white py-2 cursor-pointer">
              {isLoading ? "Booking..." : "Book"}
            </button>
          </div>
        </Form>
      </ConfigProvider>
    </div>
  );
};
