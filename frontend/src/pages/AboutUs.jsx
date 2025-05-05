import React from 'react';
import { BookOpen, Headphones, Users } from 'lucide-react';

const AboutUs = () => {
  return (
    <section className="bg-white py-24 px-6 sm:px-12 lg:px-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        <div className="space-y-6 animate-fade-in text-right">
          <h1 className="text-5xl font-bold text-indigo-800 leading-tight">
            اكتشف <span className="text-indigo-600">إقرألي</span>
          </h1>
          <p className="text-lg text-gray-700">
            في إقرألي، نؤمن بقوة القصص لإلهام الناس وتعليمهم وربطهم ببعضهم البعض. مهمتنا هي جعل المعرفة والترفيه في متناول الجميع، في أي وقت وفي أي مكان.
          </p>
          <p className="text-lg text-gray-700">
            نقدم مكتبة ضخمة من الكتب الصوتية، يتم سردها بأصوات موهوبة، مما يجعل القصص تنبض بالحياة بطريقة غامرة وجذابة. سواء كنت في طريقك للعمل، أو تمارس الرياضة، أو تسترخي في المنزل، فإن إقرألي هو رفيقك لتجربة استماع أكثر ثراءً.
          </p>
          <p className="text-lg text-gray-700">
            انضم إلينا في هذه الرحلة لإعادة اكتشاف متعة السرد القصصي، كتاب صوتي واحد في كل مرة.
          </p>
          <p className="text-xl italic text-indigo-700 mt-6">
            📚 "قصتك، صوتك، إقرألي."
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Headphones className="w-8 h-8 text-indigo-600" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">استماع غامر</h3>
              <p className="text-gray-600">استمتع بالقصص التي يتم سردها بشغف ووضوح.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">مكتبة واسعة</h3>
              <p className="text-gray-600">استكشف مجموعة واسعة من الأنواع والعناوين التي تناسب جميع الأذواق.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Users className="w-8 h-8 text-indigo-600" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">مجتمع المستمعين</h3>
              <p className="text-gray-600">تواصل مع مجتمع متزايد من عشاق الكتب الصوتية.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
