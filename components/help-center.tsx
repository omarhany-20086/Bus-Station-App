"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, HelpCircle, Shield, Bus, Users, MessageSquare, Phone, Mail } from "lucide-react"

const faqData = {
  safety: [
    {
      question: "كيف يتم ضمان أمان الأطفال في التطبيق؟",
      answer:
        "نحن نستخدم أحدث تقنيات التشفير لحماية بيانات الأطفال. جميع المجموعات خاصة ومحدودة لأولياء الأمور المتحققين من نفس المدرسة. لا نشارك أي معلومات شخصية مع أطراف ثالثة.",
    },
    {
      question: "من يمكنه رؤية موقع طفلي؟",
      answer:
        "فقط أنت كولي أمر يمكنك رؤية موقع طفلك. المعلومات محمية بكلمة مرور ولا يمكن الوصول إليها من قبل أي شخص آخر.",
    },
    {
      question: "ماذا لو فقدت هاتفي؟",
      answer:
        "يمكنك تسجيل الدخول من أي جهاز آخر باستخدام بياناتك. كما يمكنك إلغاء تفعيل الجهاز المفقود من إعدادات الحساب.",
    },
  ],
  tracking: [
    {
      question: "لماذا لا تظهر الحافلة على الخريطة؟",
      answer:
        "تأكد من أن لديك اتصال إنترنت جيد. إذا استمرت المشكلة، قد تكون الحافلة خارج الخدمة أو في منطقة ضعيفة التغطية.",
    },
    {
      question: "كم مرة يتم تحديث موقع الحافلة؟",
      answer:
        "يتم تحديث موقع الحافلة كل 30 ثانية عندما تكون في الخدمة. في حالة التأخير أو المشاكل التقنية، قد يكون التحديث أبطأ.",
    },
    {
      question: "كيف أعرف إذا كان طفلي قد ركب الحافلة؟",
      answer:
        "ستتلقى إشعاراً فورياً عندما يركب طفلك الحافلة أو ينزل منها. يمكنك أيضاً رؤية حالة الطفل في الصفحة الرئيسية.",
    },
  ],
  carpool: [
    {
      question: "كيف أنشئ مجموعة مشاركة سيارة؟",
      answer:
        "اذهب إلى قسم 'المشاركة في السيارات' واضغط على 'إنشاء مجموعة جديدة'. املأ المعلومات المطلوبة وادع أولياء الأمور الآخرين.",
    },
    {
      question: "كيف أنضم لمجموعة موجودة؟",
      answer:
        "يمكنك البحث عن المجموعات المتاحة في منطقتك ومدرسة طفلك. اضغط على 'طلب الانضمام' وانتظر موافقة مدير المجموعة.",
    },
    {
      question: "هل يمكنني مغادرة مجموعة المشاركة؟",
      answer: "نعم، يمكنك مغادرة أي مجموعة في أي وقت من إعدادات المجموعة. يُفضل إشعار الأعضاء الآخرين مسبقاً.",
    },
  ],
  technical: [
    {
      question: "التطبيق لا يعمل بشكل صحيح، ماذا أفعل؟",
      answer:
        "جرب إعادة تشغيل التطبيق أولاً. إذا لم تحل المشكلة، تأكد من أن لديك أحدث إصدار من التطبيق وأن اتصال الإنترنت مستقر.",
    },
    {
      question: "كيف أحدث معلومات طفلي؟",
      answer: "اذهب إلى 'الملف الشخصي' ثم 'إدارة الأطفال'. يمكنك تحديث المعلومات أو إضافة أطفال جدد.",
    },
    {
      question: "لا أتلقى إشعارات، كيف أحل هذه المشكلة؟",
      answer: "تحقق من إعدادات الإشعارات في التطبيق وفي إعدادات الهاتف. تأكد من أن الإشعارات مفعلة للتطبيق.",
    },
  ],
}

export function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("safety")

  const allFaqs = Object.values(faqData).flat()
  const filteredFaqs = searchQuery
    ? allFaqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : faqData[activeCategory as keyof typeof faqData]

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <HelpCircle className="h-6 w-6 text-primary" />
            مركز المساعدة
          </CardTitle>
          <CardDescription>نحن هنا لمساعدتك. ابحث عن إجابات لأسئلتك أو تواصل معنا مباشرة</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="ابحث عن سؤالك هنا..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:bg-accent transition-colors">
          <CardContent className="flex items-center gap-3 p-4">
            <Phone className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-semibold">اتصل بنا</h3>
              <p className="text-sm text-muted-foreground">+20 123 456 7890</p>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:bg-accent transition-colors">
          <CardContent className="flex items-center gap-3 p-4">
            <Mail className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-semibold">راسلنا</h3>
              <p className="text-sm text-muted-foreground">support@madrasati.com</p>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:bg-accent transition-colors">
          <CardContent className="flex items-center gap-3 p-4">
            <MessageSquare className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-semibold">دردشة مباشرة</h3>
              <p className="text-sm text-muted-foreground">متاح 24/7</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>الأسئلة الشائعة</CardTitle>
          <CardDescription>إجابات للأسئلة الأكثر شيوعاً</CardDescription>
        </CardHeader>
        <CardContent>
          {!searchQuery ? (
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="safety" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  الأمان
                </TabsTrigger>
                <TabsTrigger value="tracking" className="flex items-center gap-2">
                  <Bus className="h-4 w-4" />
                  التتبع
                </TabsTrigger>
                <TabsTrigger value="carpool" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  المشاركة
                </TabsTrigger>
                <TabsTrigger value="technical" className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  تقني
                </TabsTrigger>
              </TabsList>

              {Object.entries(faqData).map(([category, faqs]) => (
                <TabsContent key={category} value={category} className="mt-4">
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`${category}-${index}`}>
                        <AccordionTrigger className="text-right">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.length > 0 ? (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="outline">
                      {filteredFaqs.length} نتيجة للبحث "{searchQuery}"
                    </Badge>
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFaqs.map((faq, index) => (
                      <AccordionItem key={index} value={`search-${index}`}>
                        <AccordionTrigger className="text-right">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </>
              ) : (
                <div className="text-center py-8">
                  <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">لم نجد نتائج</h3>
                  <p className="text-muted-foreground mb-4">
                    لم نجد أي أسئلة تطابق بحثك. جرب كلمات مختلفة أو تواصل معنا مباشرة.
                  </p>
                  <Button variant="outline">تواصل مع الدعم</Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contact Section */}
      <Card>
        <CardHeader>
          <CardTitle>لم تجد ما تبحث عنه؟</CardTitle>
          <CardDescription>فريق الدعم جاهز لمساعدتك</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h4 className="font-semibold">أوقات العمل</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>الأحد - الخميس</span>
                  <span>8:00 ص - 6:00 م</span>
                </div>
                <div className="flex justify-between">
                  <span>الجمعة - السبت</span>
                  <span>10:00 ص - 4:00 م</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">وسائل التواصل</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  اتصال هاتفي
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  بريد إلكتروني
                </Button>
                <Button className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  دردشة مباشرة
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
