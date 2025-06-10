"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { User, School, Shield, Check, ArrowRight, ArrowLeft } from "lucide-react"

interface OnboardingData {
  userType: "parent" | "student" | ""
  name: string
  email: string
  phone: string
  school: string
  schoolCode: string
  children: Array<{
    name: string
    grade: string
    class: string
  }>
  address: string
  emergencyContact: string
  notifications: {
    busAlerts: boolean
    carpoolUpdates: boolean
    scheduleChanges: boolean
    emergencyAlerts: boolean
  }
  privacy: {
    shareLocation: boolean
    allowCarpoolInvites: boolean
    showInDirectory: boolean
  }
}

export function OnboardingFlow({ onComplete }: { onComplete: (data: OnboardingData) => void }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<OnboardingData>({
    userType: "",
    name: "",
    email: "",
    phone: "",
    school: "",
    schoolCode: "",
    children: [],
    address: "",
    emergencyContact: "",
    notifications: {
      busAlerts: true,
      carpoolUpdates: true,
      scheduleChanges: true,
      emergencyAlerts: true,
    },
    privacy: {
      shareLocation: true,
      allowCarpoolInvites: true,
      showInDirectory: false,
    },
  })
  const { toast } = useToast()

  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

  const schools = [
    "مدرسة الأزهر الشريف",
    "المدرسة الأمريكية بالقاهرة",
    "مدرسة مصر الدولية",
    "مدرسة المعادي الدولية",
    "مدرسة القاهرة الجديدة",
    "مدرسة النيل الدولية",
    "مدرسة الشويفات الدولية",
  ]

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return data.userType !== ""
      case 2:
        return data.name !== "" && data.email !== "" && data.phone !== ""
      case 3:
        return data.school !== "" && data.schoolCode !== ""
      case 4:
        return data.address !== "" && data.emergencyContact !== ""
      case 5:
        return true
      default:
        return false
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1)
      } else {
        onComplete(data)
      }
    } else {
      toast({
        title: "معلومات مطلوبة",
        description: "يرجى ملء جميع الحقول المطلوبة قبل المتابعة",
        variant: "warning",
      })
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const addChild = () => {
    setData({
      ...data,
      children: [...data.children, { name: "", grade: "", class: "" }],
    })
  }

  const updateChild = (index: number, field: string, value: string) => {
    const updatedChildren = [...data.children]
    updatedChildren[index] = { ...updatedChildren[index], [field]: value }
    setData({ ...data, children: updatedChildren })
  }

  const removeChild = (index: number) => {
    const updatedChildren = data.children.filter((_, i) => i !== index)
    setData({ ...data, children: updatedChildren })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">مرحباً بك في مدرستي</CardTitle>
          <CardDescription>دعنا نقوم بإعداد حسابك في بضع خطوات بسيطة</CardDescription>
          <div className="mt-4">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground mt-2">
              الخطوة {currentStep} من {totalSteps}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: User Type */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">ما هو دورك؟</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card
                  className={`cursor-pointer transition-all ${
                    data.userType === "parent" ? "ring-2 ring-primary bg-primary/5" : "hover:bg-accent"
                  }`}
                  onClick={() => setData({ ...data, userType: "parent" })}
                >
                  <CardContent className="flex flex-col items-center p-6">
                    <User className="h-12 w-12 text-primary mb-3" />
                    <h4 className="font-semibold">ولي أمر</h4>
                    <p className="text-sm text-muted-foreground text-center mt-2">
                      أريد تتبع أطفالي وإدارة المواصلات المدرسية
                    </p>
                  </CardContent>
                </Card>
                <Card
                  className={`cursor-pointer transition-all ${
                    data.userType === "student" ? "ring-2 ring-primary bg-primary/5" : "hover:bg-accent"
                  }`}
                  onClick={() => setData({ ...data, userType: "student" })}
                >
                  <CardContent className="flex flex-col items-center p-6">
                    <School className="h-12 w-12 text-primary mb-3" />
                    <h4 className="font-semibold">طالب</h4>
                    <p className="text-sm text-muted-foreground text-center mt-2">
                      أريد تتبع الحافلة المدرسية والانضمام للمجموعات
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Step 2: Personal Information */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">المعلومات الشخصية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم الكامل *</Label>
                  <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    placeholder="example@email.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف *</Label>
                <Input
                  id="phone"
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                  placeholder="+20 123 456 7890"
                />
              </div>
            </div>
          )}

          {/* Step 3: School Information */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">معلومات المدرسة</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="school">المدرسة *</Label>
                  <Select value={data.school} onValueChange={(value) => setData({ ...data, school: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر مدرستك" />
                    </SelectTrigger>
                    <SelectContent>
                      {schools.map((school) => (
                        <SelectItem key={school} value={school}>
                          {school}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schoolCode">كود المدرسة *</Label>
                  <Input
                    id="schoolCode"
                    value={data.schoolCode}
                    onChange={(e) => setData({ ...data, schoolCode: e.target.value })}
                    placeholder="أدخل كود المدرسة المقدم من الإدارة"
                  />
                  <p className="text-xs text-muted-foreground">
                    يمكنك الحصول على كود المدرسة من إدارة المدرسة أو من الموقع الرسمي
                  </p>
                </div>
              </div>

              {data.userType === "parent" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">الأطفال</h4>
                    <Button variant="outline" size="sm" onClick={addChild}>
                      إضافة طفل
                    </Button>
                  </div>
                  {data.children.map((child, index) => (
                    <Card key={index} className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Input
                          placeholder="اسم الطفل"
                          value={child.name}
                          onChange={(e) => updateChild(index, "name", e.target.value)}
                        />
                        <Input
                          placeholder="الصف"
                          value={child.grade}
                          onChange={(e) => updateChild(index, "grade", e.target.value)}
                        />
                        <div className="flex gap-2">
                          <Input
                            placeholder="الفصل"
                            value={child.class}
                            onChange={(e) => updateChild(index, "class", e.target.value)}
                          />
                          <Button variant="outline" size="sm" onClick={() => removeChild(index)}>
                            حذف
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 4: Contact Information */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">معلومات الاتصال</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">العنوان *</Label>
                  <Input
                    id="address"
                    value={data.address}
                    onChange={(e) => setData({ ...data, address: e.target.value })}
                    placeholder="أدخل عنوانك الكامل"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergency">جهة الاتصال في حالات الطوارئ *</Label>
                  <Input
                    id="emergency"
                    value={data.emergencyContact}
                    onChange={(e) => setData({ ...data, emergencyContact: e.target.value })}
                    placeholder="رقم هاتف جهة الاتصال في حالات الطوارئ"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Preferences */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">تفضيلات الحساب</h3>

              <div className="space-y-4">
                <h4 className="font-medium">الإشعارات</h4>
                <div className="space-y-3">
                  {Object.entries({
                    busAlerts: "تنبيهات الحافلة",
                    carpoolUpdates: "تحديثات المشاركة في السيارات",
                    scheduleChanges: "تغييرات الجدول",
                    emergencyAlerts: "تنبيهات الطوارئ",
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={key}
                        checked={data.notifications[key as keyof typeof data.notifications]}
                        onCheckedChange={(checked) =>
                          setData({
                            ...data,
                            notifications: {
                              ...data.notifications,
                              [key]: checked,
                            },
                          })
                        }
                      />
                      <Label htmlFor={key}>{label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">الخصوصية</h4>
                <div className="space-y-3">
                  {Object.entries({
                    shareLocation: "مشاركة الموقع لتتبع الحافلة",
                    allowCarpoolInvites: "السماح بدعوات المشاركة في السيارات",
                    showInDirectory: "إظهار معلوماتي في دليل أولياء الأمور",
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={key}
                        checked={data.privacy[key as keyof typeof data.privacy]}
                        onCheckedChange={(checked) =>
                          setData({
                            ...data,
                            privacy: {
                              ...data.privacy,
                              [key]: checked,
                            },
                          })
                        }
                      />
                      <Label htmlFor={key}>{label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h5 className="font-medium">الأمان والخصوصية</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      جميع بياناتك محمية ومشفرة. لن نشارك معلوماتك الشخصية مع أي طرف ثالث بدون موافقتك.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              السابق
            </Button>
            <Button onClick={nextStep} className="flex items-center gap-2">
              {currentStep === totalSteps ? (
                <>
                  <Check className="h-4 w-4" />
                  إنهاء الإعداد
                </>
              ) : (
                <>
                  التالي
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
