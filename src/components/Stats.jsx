import { motion } from 'framer-motion'

const Stats = ({ achievements }) => {
  return (
    <section className="py-16 lg:py-20 relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <motion.div
                key={index}
                className="text-center p-6 bg-white/95 backdrop-blur-xl border border-white/30 rounded-2xl shadow-lg shadow-gray-500/10 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-red-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all duration-300 group-hover:scale-110">
                  <Icon className="w-6 h-6 text-white group-hover:rotate-6 transition-transform duration-300" />
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-2 group-hover:scale-105 transition-transform duration-300">
                  {achievement.number}
                </div>
                <div className="text-gray-600 font-semibold text-sm sm:text-base mb-2">
                  {achievement.label}
                </div>
                <div className="text-xs sm:text-sm text-gray-500">
                  {achievement.description || 'Excellence in training'}
                </div>
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Stats
