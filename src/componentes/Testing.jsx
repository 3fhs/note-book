import React, { useEffect, useState } from "react";
import "./testing.css";

export default function Testing() {
  // state side
  const [nameMission, setNameMission] = useState(""); // name
  const [dateMission, setDateMission] = useState(""); // date
  const [subjectMission, setSubjectMission] = useState(""); // subject
  const [newMission, setNewMission] = useState([]); // new array
  const [edite, setEdite] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null); // عرض الموضوع

  // جلب البيانات من localStorage عند تحميل الصفحة
  useEffect(() => {
    const comeFromLocal = localStorage.getItem("newArray");
    if (comeFromLocal) {
      try {
        setNewMission(JSON.parse(comeFromLocal)); // التأكد من أن البيانات يمكن تحليلها
      } catch (error) {
        console.error("Failed to parse local storage data:", error);
        setNewMission([]); // في حالة وجود خطأ في البيانات، نعيد تهيئة المصفوفة
      }
    }
  }, []);

  // حفظ البيانات في localStorage عند تحديث newMission
  useEffect(() => {
    if (newMission.length > 0) { // حفظ البيانات فقط إذا كان هناك مهمات
      localStorage.setItem("newArray", JSON.stringify(newMission));
    }
  }, [newMission]);

  const addNewMission = () => {
    if (!nameMission || !dateMission || !subjectMission) {
      alert("من فضلك قم بملء جميع الحقول");
      return;
    }

    const addNew = {
      name: nameMission,
      date: dateMission,
      subject: subjectMission,
    };

    // تعديل البيانات
    if (edite !== null) {
      const updateArray = newMission.map((mission, index) =>
        index === edite ? addNew : mission
      );
      setNewMission(updateArray);
      setEdite(null);
    } else {
      const updateArray = [...newMission, addNew];
      setNewMission(updateArray);
    }

    setNameMission("");
    setDateMission("");
    setSubjectMission("");
  };

  // حذف المهمة
const deleteByButton = (index) => {
    const updateArray = newMission.filter((_, i) => i !== index);
    setNewMission(updateArray);
    localStorage.setItem("newArray", JSON.stringify(updateArray)); // تحديث localStorage بعد الحذف
  };

  // تعديل البيانات
  const editeData = (index) => {
    const mission = newMission[index];
    setEdite(index);
    setNameMission(mission.name);
    setDateMission(mission.date);
    setSubjectMission(mission.subject);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
  };

  const toggleMissionDetails = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // تبديل حالة المهمة النشطة
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handelSubmit}>
        <div className="head-title"> المهام اليومية </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder=" عنوان ما تريد فعله "
            value={nameMission}
            onChange={(e) => setNameMission(e.target.value)}
          />
          <input
            type="date"
            value={dateMission}
            onChange={(e) => setDateMission(e.target.value)}
          />
        </div>
        <textarea
          id="mation"
          name="mation"
          rows="5"
          cols="50"
          type="text"
          placeholder=" ما تريد انجازه فى ذلك اليوم نتمنى لك التوفيق "
          style={{ resize: "none" }}
          value={subjectMission}
          onChange={(e) => setSubjectMission(e.target.value)}
        ></textarea>
        <button type="button" onClick={addNewMission}>
          {edite !== null ? "حفظ التعديلات" : "اضافة مهمة"}
        </button>
      </form>
      <div className="list-mission">
        <h2> المهام المحفوظة </h2>
        <ul className="listes">
          {newMission.map((date, index) => (
            <li className="list click-link" key={index}>
              <i className="bi bi-caret-left-fill"></i>
              <div className="sitting">
                <i className="bi bi-x-diamond-fill" onClick={() => deleteByButton(index)}></i>
                <i className="bi bi-pencil-square" onClick={() => editeData(index)}></i>
              </div>
              <div className="list-text" onClick={() => toggleMissionDetails(index)}>
                <h3>{date.date} </h3>
                <h3>{date.name}</h3>
              </div>
              <div className={`mission-details ${activeIndex === index ? "open" : ""}`}>
                <p>{date.subject}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
